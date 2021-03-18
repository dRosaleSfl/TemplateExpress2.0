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

  tipo;
  // Forms
  ventaForm: FormGroup;

  // Clientes y empleados
  clientes;
  clienteSeleccionado;
  empleados;
  pedidosObj;
  // Inventario
  inventario;

  // Ventas
  ventas;
  ventasBusqueda;
  var1;
  otrabusqueda;

  // Carrito
  carrito = [];

  abrirDetalles: Boolean;
  abrirNota: Boolean;
  encontrado: boolean;

  constructor(private ventaservicio: ServicioService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.ventaForm = this.formBuilder.group(
      {
        id_ventas: [{ value: '', disabled: true }],
        fecha: [{ value: '', disabled: false }],
        id_cliente: [{ value: '', disabled: false }],
        pedidos: [{ value: [], disabled: false }],
        subtotal: [{ value: '', disabled: false}],
        total: [{ value: '', disabled: false}],
        anticipo: [{ value: '', disabled: false }],
        abono: [{ value: '', disabled: false }],
        saldo: [{ value: '', disabled: false }],
        id_empleado: [{ value: '', disabled: false }],
        status: [{ value: '', disabled: false }]
      }
    );
  }


  ngOnInit(): void {
    this.tipo = sessionStorage.getItem("tipo");
    console.log(this.tipo);
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
            subtotal: res[0].subtotal,
            pedidos: [],
            total: res[0].total,
            anticipo: res[0].anticipo,
            abono: res[0].abono,
            saldo: res[0].saldo,
            id_empleado: res[0].id_empleado,
            status: res[0].status
          });
          this.ventaservicio.getPedido(res[0].id_ventas).subscribe(res3 => {
            console.log("---->")
              console.log(res3);
             
             this.pedidosObj=res3;
              
            });
         this.ventaForm.patchValue({
            pedidos: this.pedidosObj
            
          });
          //console.log(this.ventaForm.pedidos.value);
        });
      });
    });

    this.abrirDetalles = true;
    this.abrirNota = false;
    $("#myModal").modal("show");
  }

  modalinventario() {
    this.carrito = [];
    this.ventaservicio.getinventario().subscribe(
      res => {
        this.inventario = res;
        this.otrabusqueda = res;
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
        total: 0,//subtotal + (subtotal * 0.16)
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
      title: 'Seleccione un tipo y Cantidad',
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
    } else{
      const { value: valor } = await Swal.fire({
        title: 'Cantidad de Productos',
        input: 'text',
        inputPlaceholder: 'Cantidad'
      });
      let cantidad:number;
      this.encontrado=false;
      cantidad=valor;
      console.log(cantidad);
      console.log("cantidad update: ");
      console.log( this.ventaservicio.getexist(producto) );
      /*
        hot fix cantidad
      */

     if (cantidad<producto.existencias){
      const tipoProducto = tipo === 'cvidrio' ? 0 : 1; // 0 con, 1 sin
      // Si el carrito esta vacio
      if (this.carrito.length == 0) {
  
        this.agregarCarrito(producto, tipoProducto,cantidad);
  
      } else {
        // Si el carrito no esta vacio
       for (let i = 0; i < this.carrito.length; i++) {
         if (this.carrito[i].id_herraje === producto.id_herraje &&
          this.carrito[i].tipo_precio === tipoProducto) {
            this.carrito[i].cantidad=+cantidad;
             this.encontrado = true;
             this.agregarCarrito(producto, tipoProducto,cantidad);
             break;
            // Si hay stock disponible (Buscar el mismo id pero con diferente tipo)
          }
        }
            // cantidadTotal += this.carrito[i].cantidad;
            //if (cantidad < producto.existencias) {
              //this.carrito[i].cantidad=+cantidad;
              //console.log(cantidadTotal);
              //Swal.fire('Se modifico el Carrito!', producto.marca + ' - ' + producto.nombre +
               // ' (' + this.carrito[i].cantidad + ' en el carrito)', 'success');
           // } else {
              // No hay mas stock
             // Swal.fire('No hay stock disponible!', producto.marca + ' - ' + producto.nombre +
               // ' (' + cantidadTotal + ' en el carrito, disponibles: ' + producto.existencias + ')', 'error');
           // }
           // break;
         // }
       // }
        if (!this.encontrado) {
          this.agregarCarrito(producto, tipoProducto, cantidad);
      }
        
    }

     }else{
      Swal.fire('No hay stock disponible!', producto.marca + ' - ' + producto.nombre +' (' + cantidad+ ' en el carrito, disponibles: ' + producto.existencias + ')', 'error');
     }

      
   
        }    // Si el producto no se ha agregado antes  
  }
  agregarCarrito(producto, tipoProducto,cantidad) {
    this.carrito.push({
      id_herraje: producto.id_herraje,
      nombre: producto.nombre,
      marca: producto.marca,
      cantidad: cantidad,
      tipo_precio: tipoProducto,
      precio_unitario: tipoProducto === 0 ? producto.preciocvidrio : producto.preciosvidrio
    });
    console.log(this.carrito);
    Swal.fire('Agregado al Carrito!', producto.marca + ' - ' + producto.nombre, 'success');
  }
  vaciarCarrito() {
    this.carrito = [];
    Swal.fire('Se eliminaron los productos del Carrito!', '', 'success');
  }
  agregar() {
    /*
    console.log(this.ventaForm.value);
    console.log(this.ventaForm.value.fecha);
    //console.log("--------->"+this.inventario);
    console.log("------->"+this.carrito);
    */
    if (this.ventaForm.valid) {
 //     console.log(this.ventaForm.value);
  //    console.log(this.ventaForm.valid);
     this.ventaservicio.addVenta(this.ventaForm.value, JSON.stringify(this.carrito)).subscribe(res => {
        console.log("res del ventaservicio: ");
        console.log(res);
      });
      Swal.fire("Venta agregada exactamente");
      this.getcliente();
    }
    else{
      Swal.fire("Campos vacios");
      console.log(this.ventaForm.valid);
      console.log(this.ventaForm.value);
    }
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
        if (this.ventaForm.valid) {
          //     console.log(this.ventaForm.value);
           //    console.log(this.ventaForm.valid);
            console.log(this.ventaForm.getRawValue().id_ventas);
            let id = this.ventaForm.getRawValue().id_ventas;
              this.ventaservicio.ediventa(this.ventaForm.value,id).subscribe(res => {
                 console.log("------->hola");
                 console.log(res);
               });
               Swal.fire("Venta editada exactamente");
               this.getcliente();
             }
             else{
               Swal.fire("Campos vacios");
               console.log(this.ventaForm.valid);
               console.log(this.ventaForm.value);
             }
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


  borraruno(item:any){
    console.log(item.id_pedido);
    let pedId;
    pedId = item.id_pedido;
      this.ventaservicio.deleteped(item).subscribe(
        res => {
          console.log(res); 
        }
      );
      Swal.fire('Herraje Eliminado Exitosamente');
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


  aFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.inventario = this.otrabusqueda;
    } else {
      console.log(this.otrabusqueda);
      this.inventario = this.otrabusqueda.filter((var1: {id_herraje: string; nombre: string; marca: string; }) =>
       // console.log(var1) ;
      var1.id_herraje.toLowerCase().includes(filterValueLower)  ||
      var1.nombre.toLowerCase().includes(filterValueLower) ||
      var1.marca.toLowerCase().includes(filterValueLower) 
      );
    }
  }
}


