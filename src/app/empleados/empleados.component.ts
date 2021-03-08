import { ServicioService } from './../servicios/servicio.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  tipo;
  empleados;
  empleadoForm;
  mempleados;
  empleadoForm1: any;
  empleadobusqueda;
  copia= true;
  public copia1 = false;
  public indice = true;
  public indice1 = false;
  constructor(private empleadoservicio:ServicioService, private formBuilder: FormBuilder ) { 
    this.empleadoForm = this.formBuilder.group({
      nombre_empleado:['',Validators.required],
      ape_pat:['',Validators.required],
      ape_mat:['',Validators.required],
      puesto:'',
      telefono:['',Validators.required],
      calle:['',Validators.required],
      num_int:['',Validators.required],
      num_ext:['',Validators.required],
      colonia:['',Validators.required],
      cp:['',Validators.required],
      ciudad:['',Validators.required],
      estado:['',Validators.required],
      pais:['',Validators.required],
      nombre_usuario:['',Validators.required],
      contrasena:['',Validators.required]
    });
    this.empleadoForm1 = this.formBuilder.group({
      id_empleado:['',Validators.required],
      nombre_empleado:['',Validators.required],
      ape_pat:['',Validators.required],
      ape_mat:['',Validators.required],
      puesto:['',Validators.required],
      telefono:['',Validators.required],
      calle:['',Validators.required],
      num_int:['',Validators.required],
      num_ext:['',Validators.required],
      colonia:['',Validators.required],
      cp:['',Validators.required],
      ciudad:['',Validators.required],
      estado:['',Validators.required],
      pais:['',Validators.required],
      nombre_usuario:['',Validators.required],
      contrasena:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.tipo = sessionStorage.getItem("tipo");
    this.getempleado();
  }
  getempleado(){
    this.empleadoservicio.getempleados().subscribe(
      res =>{
        console.log(res);
        this.empleados = res;
        this.empleadobusqueda=res;
      }
    );
  }
  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.empleados = this.empleadobusqueda;
    } else {
      this.empleados = this.empleadobusqueda.filter((empleado: { id_empleado: string | string[]; nombre: string; ape_pat: string; ape_mat: string; }) =>
      empleado.id_empleado.toString().includes(filterValueLower) ||
      empleado.nombre.toLowerCase().includes(filterValueLower) ||
      empleado.ape_pat.toLowerCase().includes(filterValueLower) ||
      empleado.ape_mat.toLowerCase().includes(filterValueLower)
      );
    }
  }
  verempleado(item:any){
    let empleadoId;
    empleadoId = item.id_empleado;
    console.log(empleadoId);
    this.empleadoservicio.getempleado(empleadoId).subscribe(res=>{
      console.log(res);
      this.mempleados = res;
     this.empleadoForm1.setValue({
      id_empleado:empleadoId,
      nombre_empleado: this.mempleados[0].nombre,
      ape_pat:this.mempleados[0].ape_pat,
      ape_mat:this.mempleados[0].ape_mat,
      puesto:this.mempleados[0].puesto,
      telefono:this.mempleados[0].telefono,
      calle:this.mempleados[0].calle,
      num_int:this.mempleados[0].num_int,
      num_ext:this.mempleados[0].num_ext,
      colonia:this.mempleados[0].colonia,
      cp:this.mempleados[0].cp,
      ciudad:this.mempleados[0].ciudad,
      estado:this.mempleados[0].estado,
      pais:this.mempleados[0].pais,
      nombre_usuario:this.mempleados[0].nombre_usuario,
      contrasena:this.mempleados[0].contrasena
     });
    }
    );
  }

  newempleado(){
 if(this.empleadoForm.valid){
  console.log(this.empleadoForm.value);
  this.empleadoservicio.addempleado(this.empleadoForm.value).subscribe(
    res => {
      console.log(res); 
    }
  );
  Swal.fire('Empleado Añadido Exitosamente');
 }else{
  Swal.fire('Campos Vacios');
 }
  
  }
   borrar(){
      console.log(this.empleadoForm1.value);
     this.empleadoservicio. deletempleado(this.empleadoForm1.value).subscribe(
        res => {
          console.log(res); 
        }
      );
      Swal.fire('Empleado Eliminado Exitosamente');
   }
   editar(){
    if(this.empleadoForm1.valid){
      console.log(this.empleadoForm1.value);
      console.log(this.empleadoForm1.value);
      this.empleadoservicio.editempleado(this.empleadoForm1.value).subscribe(
        res => {
          console.log(res); 
        }
      );
      Swal.fire('Empleado Actualizado Exitosamente');
     }else{
      Swal.fire('Campos Vacios');
     }

   
 }
 
 

}