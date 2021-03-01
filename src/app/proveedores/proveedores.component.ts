import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  tipo;
  proveedorForm;
  proveedores;
  mproveedor;
  proveedorForm1: any;
 proveedorbuscar;
 copia= true;
  public copia1 = false;
  public indice = true;
  public indice1 = false;

  constructor(private proveedorservicio: ServicioService, private formBuilder: FormBuilder) {
    this.proveedorForm = this.formBuilder.group({
      nombre_proveedor: '',
      ape_pat:'',
      ape_mat:'',
      rfc:'',
      tipo: '',
      telefono: '',
      correo: '',
      calle: '',
      num_int: '',
      num_ext: '',
      colonia: '',
      cp: '',
      ciudad: '',
      estado: '',
      pais: '',
    });
   
   this.proveedorForm1 = this.formBuilder.group({
    id_proveedor:'',
    nombre_proveedor: '',
    ape_pat:'',
    ape_mat:'',
    rfc:'',
    tipo: '',
    telefono: '',
    correo: '',
    calle: '',
    num_int: '',
    num_ext: '',
    colonia: '',
    cp: '',
    ciudad: '',
    estado: '',
    pais: '',
  });
 }

  ngOnInit(): void {
    this.tipo = sessionStorage.getItem("tipo");
    this.getproveedor();
  }
  
  getproveedor(){
    this.proveedorservicio.getproveedores().subscribe(
      res =>{
        console.log(res);
        this.proveedores= res;
        this.proveedorbuscar=res;
      }
    );
  }
  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.proveedores = this.proveedorbuscar;
    } else {
      this.proveedores = this.proveedorbuscar.filter((proveedor: { id_proveedor: string | string[]; nombre: string; ape_pat: string; ape_mat: string; }) =>
      proveedor.id_proveedor.toString().includes(filterValueLower) ||
      proveedor.nombre.toLowerCase().includes(filterValueLower) ||
      proveedor.ape_pat.toLowerCase().includes(filterValueLower) ||
      proveedor.ape_mat.toLowerCase().includes(filterValueLower)
      );
    }
  }
  verproveedor(item :any){
    let proveedorID;
    proveedorID= item.id_proveedor;
    console.log(proveedorID);
    this.proveedorservicio.getproveedor(proveedorID).subscribe(res=>{
      console.log(res);
      this. mproveedor = res;
      this.proveedorForm1.setValue({
        id_proveedor:proveedorID,
        nombre_proveedor:this.mproveedor[0].nombre,
        ape_pat:this.mproveedor[0].ape_pat,
        ape_mat:this.mproveedor[0].ape_mat,
        rfc:this.mproveedor[0].rfc,
        tipo: this.mproveedor[0].tipo,
        telefono: this.mproveedor[0].telefono,
        correo: this.mproveedor[0].correo,
        calle: this.mproveedor[0].calle,
        num_int: this.mproveedor[0].num_int,
        num_ext: this.mproveedor[0].num_ext,
        colonia: this.mproveedor[0].colonia,
        cp:this.mproveedor[0].cp,
        ciudad:this.mproveedor[0].ciudad,
        estado: this.mproveedor[0].estado,
        pais: this.mproveedor[0].pais,
      });

    }
    );
  }
  
  newproveedor(){
   console.log(this.proveedorForm.value);
   this.proveedorservicio.addprovedor(this.proveedorForm.value).subscribe(
    res => {
      console.log(res); 
    }
  );
  Swal.fire('Proveedor Añadido Exitosamente');
  }
  borrar(){
    console.log(this.proveedorForm1.value);
    this.proveedorservicio.deletproveedor(this.proveedorForm1.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Proveedor Eliminado Exitosamente');
  }
  editar(){
    console.log(this.proveedorForm1.value);
    this.proveedorservicio.editproveedor(this.proveedorForm1.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Proveedor Actualizado Exitosamente');
  }

 


}