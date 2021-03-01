import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServicioService } from '../servicios/servicio.service';

@Component({
  selector: 'app-lista-precios',
  templateUrl: './lista-precios.component.html',
  styleUrls: ['./lista-precios.component.css']
})
export class ListaPreciosComponent implements OnInit {
  tipo;
 precioos;
  buscarprecioos;
  preciooos: any;
  preciooos1: any;
  price;
  productos;
  proveedores;
  constructor(private preciosservicio: ServicioService, private formBuilder: FormBuilder) {
    this.preciooos = this.formBuilder.group({
    id_listaprecios:'',
    id_herraje:'',
    nom_herraje:'',
    marca:'',
    id_proveedor:'',
    nombre:'',
    ape_pat:'',
    ape_mat:'',
    precio_compra:''
    });
    this.preciooos1 = this.formBuilder.group({
      id_listaprecios:'',
      id_herraje:'',
      nom_herraje:'',
      marca:'',
      id_proveedor:'',
      nombre:'',
      ape_pat:'',
      ape_mat:'',
      precio_compra:''
      });
   }

  ngOnInit() {
    this.tipo = sessionStorage.getItem("tipo");
    this.precios();
    this.getproveedor();
    this.getproducto();
  }

  getproveedor() {
    this.preciosservicio.getproveedores().subscribe(
      res => {
        this.proveedores = res;
        console.log(this.proveedores);
      }
    );
  }

  getproducto() {
    this.preciosservicio.getinventario().subscribe(
      res => {
        this.productos = res;
      }
    );
  }

 precios(){
  this.preciosservicio.getprecios().subscribe(
    res => {
      console.log(res);
      this.precioos = res;
      this.buscarprecioos = res;
    }
  );
 }
 applyFilter(filterValue: string) {
  let filterValueLower = filterValue.toLowerCase();
  if (filterValue === '') {
    this.precioos= this.buscarprecioos;
  } else {
    this.precioos = this.buscarprecioos.filter((prod: { id_listaprecios: string; id_herraje: string; nom_herraje: string; marca: string; nombre: string; ape_pat: string; ape_mat: string; precio_compra: string; }) =>
    prod.id_listaprecios.toString().includes(filterValueLower) ||
    prod.id_herraje.toLowerCase().includes(filterValueLower) ||
    prod.nom_herraje.toLowerCase().includes(filterValueLower) ||
    prod.marca.toLowerCase().includes(filterValueLower) ||
    prod.nombre.toLowerCase().includes(filterValueLower) ||
    prod.ape_pat.toLowerCase().includes(filterValueLower) ||
    prod.ape_mat.toLowerCase().includes(filterValueLower) ||
    prod.precio_compra.toString().includes(filterValueLower) 
    );
  }
}
 verproducto(item:any){
  console.log(item.id_listaprecios);
  let productoId;
  productoId = item.id_listaprecios;
  this.preciosservicio.getprecio(item).subscribe(res=>{
    console.log(res);
    this.price = res;
    this.preciooos1.setValue({
      id_listaprecios: this.price[0].id_listaprecios,
       id_herraje: this.price[0].id_herraje,
       nom_herraje: this.price[0].nom_herraje,
       marca: this.price[0].marca,
       nombre: this.price[0].nombre,
       ape_pat: this.price[0].ape_pat,
       ape_mat: this.price[0].ape_mat,
       id_proveedor: this.price[0].id_proveedor,
      precio_compra:this.price[0].precio_compra
      });
    });
     
 }
 borrar(){
  console.log(this.preciooos1.value);
    this.preciosservicio.deletprecio(this.preciooos1.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Precio Eliminado Exitosamente');
 }
 editar(){
  console.log(this.preciooos1.value);
  this.preciosservicio.updtaeprecio(this.preciooos1.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Precio Editado Exitosamente');
 }
 newprecio(){
  console.log(this.preciooos.value);
  this.preciosservicio.addprecio(this.preciooos.value).subscribe(
      res => {
        console.log(res); 

  this.preciosservicio.getproveedor(res[0].id_proveedor).subscribe(res1 => {
    console.log(res1); 
    this.preciosservicio.getproducto(res[0].id_herraje).subscribe(res2 => {
      console.log(res2); 
      this.preciooos.patchValue({
        id_proveedor: res1[0].id_proveedor,
        id_herraje: res2[0].id_herraje
    });
  });
});

    Swal.fire('Precio Añadido Exitosamente');
 });
}

}