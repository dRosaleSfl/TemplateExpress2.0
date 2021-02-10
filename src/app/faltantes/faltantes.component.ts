import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faltantes',
  templateUrl: './faltantes.component.html',
  styleUrls: ['./faltantes.component.css']
})
export class FaltantesComponent implements OnInit {
  faltantes;
  listas;
  faltantesBusqueda;
  faltantesForm;
  fal;
  addfaltantesForm;
  productos;
  proveedores;

  constructor(private faltantesservicio: ServicioService,private formBuilder: FormBuilder) {
    this.faltantesForm = this.formBuilder.group({
      id_producto:'',
      id_faltantes:'',
      fecha:'',
      id_herraje:'',
      nom_herraje:'',
      marca:'',
      nombre:'',
      ape_pat:'',
      ape_mat:'',
      id_proveedor:'',
      cantidad:''
      });
      this.addfaltantesForm = this.formBuilder.group({
      id_producto:'',
      id_faltantes:'',
      fecha:'',
      id_herraje:'',
      nom_herraje:'',
      marca:'',
      nombre:'',
      ape_pat:'',
      ape_mat:'',
      id_proveedor:'',
      cantidad:''
      });
   }

  ngOnInit(): void {
    this.getfaltante();
    this.getproveedor();
    this.getproducto();
  }


  getproveedor() {
    this.faltantesservicio.getproveedores().subscribe(
      res => {
        this.proveedores = res;
        console.log(this.proveedores);
      }
    );
  }

  getproducto() {
    this.faltantesservicio.getinventario().subscribe(
      res => {
        this.productos = res;
      }
    );
  }


  getfaltante() {
    this.faltantesservicio.getfaltantes().subscribe(
      res => {
        this.listas = res;
        this.faltantesBusqueda = res;
      }
    );
  }
  verfaltante(item:any){
    console.log(item.id_faltantes);
    let faltanteId;
    faltanteId = item.id_faltantes;
    this.faltantesservicio.getfaltante(item).subscribe(res=>{
      console.log(res);
      this.fal = res;
      this.faltantesForm.setValue({
         id_faltantes: this.fal[0].id_faltantes,
         id_producto: this.fal[0].id_producto,
         fecha: this.fal[0].fecha,
         id_herraje: this.fal[0].id_herraje,
         nom_herraje: this.fal[0].nom_herraje,
         marca: this.fal[0].marca,
         id_proveedor: this.fal[0].id_proveedor,
         nombre:this.fal[0].nombre,
         ape_pat:this.fal[0].ape_pat,
         ape_mat:this.fal[0].ape_mat,
         cantidad:this.fal[0].cantidad
        });
      });
       
   }

   newfaltante(){
    this.faltantesservicio.addFaltantes(this.addfaltantesForm.value).subscribe(
      res => {
        console.log(res); 
      this.faltantesservicio.getproveedor(res[0].id_proveedor).subscribe(res1 => {
      console.log(res1); 
      this.faltantesservicio.getproducto(res[0].id_herraje).subscribe(res2 => {
        console.log(res2); 
        this.addfaltantesForm.patchValue({
          id_proveedor: res1[0].id_proveedor,
          id_herraje: res2[0].id_herraje
      });
    });
  });
  
      Swal.fire('Lista Añadida Exitosamente');
   });
  }

  borrar(){
    console.log(this.faltantesForm.value);
      this.faltantesservicio.deletefaltante(this.faltantesForm.value).subscribe(
        res => {
          console.log(res); 
        }
      );
      Swal.fire('Lista Eliminada Exitosamente');
   }

   borrarprod(item:any){
    console.log(item.id_producto);
    let prodId;
     prodId = item.id_producto;
    this.faltantesservicio.deleteprod(item).subscribe(
      res=>{
      console.log(res);
   /*  console.log(this.faltantesForm.value);
      this.faltantesservicio.deleteprod(this.faltantesForm.value).subscribe(
        res => {
          console.log(res); 
        }
      );*/
     
      }); 
      Swal.fire('Lista Eliminada Exitosamente');
   }


  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.listas= this.faltantesBusqueda;
    } else {
      this.listas = this.faltantesBusqueda.filter((lis: { id_faltantes: string; fecha: Date; }) =>
      lis.id_faltantes.toString().includes(filterValueLower) ||
      lis.fecha.toString().includes(filterValueLower) 
      );
    }
  }

}
