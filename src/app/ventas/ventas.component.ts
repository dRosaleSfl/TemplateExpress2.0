import { from } from 'rxjs';
import { ServicioService } from "../servicios/servicio.service";
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  providers: [DatePipe]
})
export class VentasComponent implements OnInit {

  // Forms
  ventaForm: FormGroup;

  // Clientes y empleados
  clientes;
  clienteSeleccionado;
  empleados;

  // Inventario
  inventario;

  // Ventas
  ventas;
  ventasBusqueda;

  // Carrito
  carrito = [];

  abrirDetalles: Boolean;
  abrirNota: Boolean;

  constructor(private ventaservicio: ServicioService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.ventaForm = this.formBuilder.group(
      {
        id_ventas: [{ value: '', disabled: true }],
        fecha: [{ value: '', disabled: true }],
        id_cliente: [{ value: '', disabled: false }],
        pedidos: [{ value: [], disabled: false }],
        subtotal: [{ value: '', disabled: true }],
        total: [{ value: '', disabled: true }],
        anticipo: [{ value: '', disabled: false }],
        abono: [{ value: '', disabled: false }],
        saldo: [{ value: '', disabled: false }],
        id_empleado: [{ value: '', disabled: false }],
        status: [{ value: '', disabled: false }]
      }
    );
  }

  ngOnInit(): void {
    this.getcliente();
    this.getempleados();
    this.getventa();
  }

  getcliente() {
    this.ventaservicio.getusuario().subscribe(
      res => {
        this.clientes = res;
        console.log(this.clientes);
      }
    );
  }

  getempleados() {
    this.ventaservicio.getempleados().subscribe(
      res => {
        this.empleados = res;
      }
    );
  }

  getventa() {
    this.ventaservicio.getsales().subscribe(
      res => {
        this.ventas = res;
        this.ventasBusqueda = res;
      }
    );
  }

  verventas(item: any) {
    this.ventaservicio.getventas(item.id_ventas).subscribe(res => {

      // Cliente
      this.ventaservicio.getclient(res[0].id_cliente).subscribe(res1 => {

        // Empleado
        this.ventaservicio.getempleado(res[0].id_empleado).subscribe(res2 => {

          // Datos del form
          this.ventaForm.patchValue({
            id_ventas: res[0].id_ventas,
            fecha: this.datePipe.transform(res[0].fecha, 'yyyy/MM/dd'),
            id_cliente: res[0].id_cliente,
            pedidos: [],
            subtotal: res[0].subtotal,
            total: res[0].total,
            anticipo: res[0].anticipo,
            abono: res[0].abono,
            saldo: res[0].saldo,
            id_empleado: res[0].id_empleado,
            status: res[0].status
          });

          // Pedidos
          var pedidosObj = [];
          res[0].id_pedido.split(',').forEach(element => {
            this.ventaservicio.getPedido(element).subscribe(res3 => {
              pedidosObj.push(res3[0]);
            });
          });

          this.ventaForm.patchValue({
            pedidos: pedidosObj
          });
        });
      });
    });

    this.abrirDetalles = true;
    this.abrirNota = false;
    $("#myModal").modal("show");
  }

  modalinventario() {

    this.ventaservicio.getinventario().subscribe(
      res => {
        this.inventario = res;
      }
    );

    this.abrirNota = false;
    this.abrirDetalles = false;
    $("#myModal").modal("hide");
    $("#myModal").modal("show");
  }

  modalVenta() {
    // Si el carrito esta vacio
    if (this.carrito.length == 0) {
      Swal.fire('El carrito esta vacio!', '', 'error');
    } else {

      var subtotal = 0;
      this.carrito.forEach(producto => {
        subtotal += producto.precio_unitario * producto.cantidad;
      });

      // Datos del form
      this.ventaForm.patchValue({
        id_ventas: 'Auto',
        fecha: this.datePipe.transform(new Date(), 'yyyy/MM/dd'),
        id_cliente: 1,
        pedidos: this.carrito,
        subtotal: subtotal,
        total: subtotal + (subtotal * 0.16),
        anticipo: 0,
        abono: 0,
        saldo: 0,
        id_empleado: 1,
        status: 0
      });

      this.abrirNota = true;
      this.abrirDetalles = false;
      $("#myModal").modal("show");
    }
  }

  async agregarAlCarrito(producto) {

    const { value: tipo } = await Swal.fire({
      title: 'Seleccione un tipo',
      input: 'select',
      inputOptions: {
        'cvidrio': 'Con vidrio ($' + producto.preciocvidrio + ')',
        'svidrio': 'Sin vidrio ($' + producto.preciosvidrio + ')'
      },
      inputPlaceholder: '',
      showCancelButton: true
    });

    // Se dio clic en cancelar
    if (!tipo) {
      return;
    }

    const tipoProducto = tipo === 'cvidrio' ? 0 : 1; // 0 con, 1 sin

    // Si el carrito esta vacio
    if (this.carrito.length == 0) {
      this.agregarCarrito(producto, tipoProducto);
    } else {

      // Si el carrito no esta vacio
      var encontrado = false;
      for (let i = 0; i < this.carrito.length; i++) {
        if (this.carrito[i].id_herraje === producto.id_herraje &&
          this.carrito[i].tipo_precio === tipoProducto) {

          // Si hay stock disponible (Buscar el mismo id pero con diferente tipo)
          var cantidadTotal = 0;
          for (let j = 0; j < this.carrito.length; j++) {
            if (this.carrito[j].id_herraje === producto.id_herraje && i != j) {
              cantidadTotal = this.carrito[j].cantidad;
              break;
            }
          }

          cantidadTotal += this.carrito[i].cantidad;
          if (cantidadTotal < producto.existencias) {
            this.carrito[i].cantidad++;
            //console.log(cantidadTotal);
            Swal.fire('Se modifico el Carrito!', producto.marca + ' - ' + producto.nombre +
              ' (' + this.carrito[i].cantidad + ' en el carrito)', 'success');
          } else {
            // No hay mas stock
            Swal.fire('No hay stock disponible!', producto.marca + ' - ' + producto.nombre +
              ' (' + cantidadTotal + ' en el carrito, disponibles: ' + producto.existencias + ')', 'error');
          }

          encontrado = true;
          break;
        }
      }

      // Si el producto no se ha agregado antes
      if (!encontrado) {
        this.agregarCarrito(producto, tipoProducto);
      }
    }
  }

  agregarCarrito(producto, tipoProducto) {

    this.carrito.push({
      id_herraje: producto.id_herraje,
      nombre: producto.nombre,
      marca: producto.marca,
      cantidad: 1,
      tipo_precio: tipoProducto,
      precio_unitario: tipoProducto === 0 ? producto.preciocvidrio : producto.preciosvidrio
    });

    Swal.fire('Agregado al Carrito!', producto.marca + ' - ' + producto.nombre, 'success');
  }

  vaciarCarrito() {
    this.carrito = [];
    Swal.fire('Se eliminaron los productos del Carrito!', '', 'success');
  }

  agregar() {
    Swal.fire({
      title: '¿Desea guardar la nueva venta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6C52B7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar'
    }).then((result) => {
      if (result.isConfirmed) {

        //console.log(this.ventaForm.getRawValue()); // Para incluir los controles deshabilitados usar getRawValue()

        // Agregar Venta
          this.ventaservicio.addVenta(this.ventaForm.getRawValue(), JSON.stringify(this.inventario)).subscribe(res => {
            if (res.hasOwnProperty('affectedRows')) {
              Swal.fire('Venta Agregada!', 'Los datos de la venta han sido guardados', 'success');
              this.getventa();
            } else {
              Swal.fire('Error!', 'Ha ocurrido un error', 'error');
            }
            $("#myModal").modal("hide");
          });
      }
    });
  }

  editar() {
    //console.log(this.ventaForm.getRawValue());
    Swal.fire({
      title: '¿Desea guardar los cambios a la venta con id: ' + this.ventaForm.getRawValue().id_ventas + '?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6C52B7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaservicio.ediventa(this.ventaForm.getRawValue()).subscribe(
          res => {
            if (res.hasOwnProperty('affectedRows')) {
              Swal.fire('Actualizado!', 'Los datos de la venta han sido actualizados', 'success');

              this.getventa();
            } else {
              Swal.fire('Error!', 'Ha ocurrido un error', 'error');
            }
            $("#myModal").modal("hide");
          }
        );
      }
    });
  }

  borrar() {

    Swal.fire({
      title: '¿Estas seguro de eliminar la venta con id: ' + this.ventaForm.getRawValue().id_ventas + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#6C52B7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ventaservicio.deleteventa(this.ventaForm.getRawValue().id_ventas).subscribe(
          res => {
            if (res.hasOwnProperty('affectedRows')) {
              Swal.fire('Eliminado!', 'La venta ha sido eliminada', 'success');
              this.getventa();
            } else {
              Swal.fire('Error!', 'Ha ocurrido un error', 'error');
            }
            $("#myModal").modal("hide");
          }
        );
      }
    });
  }


  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.ventas = this.ventasBusqueda;
    } else {
      this.ventas = this.ventasBusqueda.filter((venta: { id_ventas: string; fecha: Date; nombre: string; ape_pat: string; ape_mat: string; }) =>
        venta.id_ventas.toString().includes(filterValueLower) ||
        venta.fecha.toString().includes(filterValueLower) ||
        venta.ape_pat.toLowerCase().includes(filterValueLower) ||
        venta.ape_mat.toLowerCase().includes(filterValueLower) ||
        venta.nombre.toLowerCase().includes(filterValueLower) 
      );
    }
  }
}


