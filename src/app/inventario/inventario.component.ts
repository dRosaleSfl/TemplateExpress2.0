import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ServicioService} from "../servicios/servicio.service";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  tipo;
  inventario;
  producto;
  id_inventario;
  id_herraje;
  nombre;
  marca;
  preciocvidrio;
  preciosvidrio;
  existencias;
  min;
  inventarioForm;
  inventarioForm1: any;
  buscarproducto;

  constructor(private inventarioservicio: ServicioService, private formBuilder: FormBuilder ) { 
    this.inventarioForm = this.formBuilder.group({
      id_herraje:['', Validators.required],
      nombre:['', Validators.required],
      marca:['', Validators.required],
      preciocvidrio:['', Validators.required],
      preciosvidrio:['', Validators.required],
      existencias:['', Validators.required],
      min:['', Validators.required]
    });
    this.inventarioForm1 = this.formBuilder.group({
      id_herraje:['', Validators.required],
      nombre:['', Validators.required],
      marca:['', Validators.required],
      preciocvidrio:['', Validators.required],
      preciosvidrio:['', Validators.required],
      existencias:['', Validators.required],
      min:['', Validators.required]
    });
  }

  ngOnInit() {
    this.tipo = sessionStorage.getItem("tipo");
    console.log("inventario tipo: ");
    console.log(this.tipo);
    this.getinventario();
    if(this.tipo === 0) {
      this.inventarioForm1.get("id_inventario").disable();
    }
  }

  getinventario(){
    this.inventarioservicio.getinventario().subscribe(
      res =>{
        console.log(res);
        this.inventario = res;
        this.buscarproducto=res;
      }
    );
  }
  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.inventario = this.buscarproducto;
    } else {
      this.inventario = this.buscarproducto.filter((producto: { id_herraje: string | string[]; nombre: string; marca: string; }) =>
      producto.id_herraje.toString().includes(filterValueLower) ||
      producto.nombre.toLowerCase().includes(filterValueLower) ||
      producto.marca.toLowerCase().includes(filterValueLower) 
      );
    }
  }

  verproducto(item:any){
    console.log(item.id_inventario);
    let productoId;
    productoId = item.id_inventario;
    console.log(productoId);
    this.inventarioservicio.getproducto(productoId).subscribe(res=>{
      console.log(res);
      this.producto = res;
      this.inventarioForm1.setValue({
        id_inventario:productoId,
        id_herraje:this.producto[0].id_herraje,
        nombre:this.producto[0].nombre,
        marca:this.producto[0].marca,
        preciocvidrio:this.producto[0].preciocvidrio,
        preciosvidrio:this.producto[0].preciosvidrio,
        existencias:this.producto[0].existencias,
        min:this.producto[0].min
      });
      

      
    }
    );
  }
  borrar(){
    console.log(this.inventarioForm1.value);
    this.inventarioservicio.deletproducto(this.inventarioForm1.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Producto Eliminado Exitosamente');
    this.getinventario();
  }
  editar(){
    if (this.inventarioForm.valid) {
    console.log(this.inventarioForm1.value);
   
    this.inventarioservicio.editproducto(this.inventarioForm1.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Producto Actualizado Exitosamente');
    this.getinventario();
  }else{
    Swal.fire('Campos vacíos');
  }
  }

  newproducto(){
    if (this.inventarioForm.valid) {
    console.log(this.inventarioForm.value);
    console.log(this.inventarioForm.valid);
   /* this.inventarioservicio.addproducto(this.inventarioForm.value).subscribe(
      res => {
        console.log(res); 
      }
    );*/
    Swal.fire('Porducto Añadido Exitosamente');
    this.getinventario();
    }else{
      Swal.fire('Campos vacíos');
      console.log(this.inventarioForm.value);
      console.log(this.inventarioForm.valid);
    }
  }

 

}