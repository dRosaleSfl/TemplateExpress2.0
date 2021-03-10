import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ServicioService} from "../servicios/servicio.service";
import { FormBuilder } from '@angular/forms';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-ganancias',
  templateUrl: './ganancias.component.html',
  styleUrls: ['./ganancias.component.css']
})
export class GananciasComponent implements OnInit {
  id_ganancias;
  num_nota;
  tipo_pago;
  cantidad;
  concepto;
  status;
  nombre_cliente;
  ape_pat;
  ape_mat;
  id_cliente;
  recibio;
  ganancias;
  gananciaForm;
  clientes;
  gananciasBusqueda;
  editForm;
  gan;

  constructor(private gananciasservicio: ServicioService, private formBuilder: FormBuilder ) { 
   this.gananciaForm = this.formBuilder.group({
      id_ganancias:'',
      num_nota:'',
      tipo_pago:'',
      cantidad:'',
      concepto:'',
      status:'',
      ganancias:'',
      id_cliente:'',
      recibio:'',
      fecha: '',
      nombre:'',
      ape_pat:'',
      ape_mat:''
    });
    this.editForm = this.formBuilder.group({
      id_ganancias:'',
      num_nota:'',
      tipo_pago:'',
      cantidad:'',
      concepto:'',
      status:'',
      id_cliente:'',
      recibio:'',
      fecha: '',
      nombre:'',
      ape_pat:'',
      ape_mat:''
    });
  }

  ngOnInit(): void {
    this.getganancias();
    this.getclient();
  }

  getclient() {
    this.gananciasservicio.getusuario().subscribe(
      res => {
        this.clientes = res;
      }
    );
  }


  getganancias(){
    let temp: String;
    this.gananciasservicio.getganancias().subscribe(
      res =>{
        let objtemp = res;
        console.log(res);
        for(let i=0; i<Object.keys(objtemp).length; i++) {
          temp = res[i].fecha;
          console.log(temp);
          if (temp === null) {
            res[i].fecha = "fecha no disponible";
          }
          else {
            res[i].fecha = temp.substring(0,10);
          }
          1
        }
        console.log(res);
        this.ganancias = res;
        this.gananciasBusqueda = res;
      }
    );
  }


  newganancia(){
    this.gananciasservicio.addGanancias(this.gananciaForm.value).subscribe(
      res => {
        console.log("newganancia res: ");
        console.log(res);
/* 
        this.gananciasservicio.getclient(res[0].id_cliente).subscribe(res1 => {
          console.log("newganancia res1: ");
          console.log(res1); 
          this.gananciaForm.patchValue({
            id_cliente: res1[0].id_cliente
          });
        }); */
      Swal.fire('Registro añadido exitosamente');
   });
  }

  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.ganancias= this.gananciasBusqueda;
    } else {
      this.ganancias = this.gananciasBusqueda.filter((gan: { num_nota: string; tipo_pago: string; nombre: string; ape_pat: string; ape_mat: string; cantidad: string; concepto: string; status: string; recibio: string; }) =>
      gan.num_nota.toString().includes(filterValueLower) ||
      gan.tipo_pago.toLowerCase().includes(filterValueLower) ||
      gan.nombre.toLowerCase().includes(filterValueLower) ||
      gan.ape_pat.toLowerCase().includes(filterValueLower) ||
      gan.ape_mat.toLowerCase().includes(filterValueLower) ||
      gan.cantidad.toString().includes(filterValueLower) ||
      gan.concepto.toString().includes(filterValueLower) ||
      gan.status.toLowerCase().includes(filterValueLower) ||
      gan.recibio.toLowerCase().includes(filterValueLower) 
      );
    }
  }

  verganancia(item:any){
    console.log(item.id_ganancias);
    let gananciaId;
    let temp:String;
    let fecha;
    gananciaId = item.id_ganancias;
    console.log(gananciaId);
    this.gananciasservicio.getganancia(gananciaId).subscribe(res=>{
      this.gan = res;
      temp = this.gan[0].fecha;
      fecha = temp.substring(0,10);
      console.log(fecha);
      this.editForm.setValue({
        id_ganancias:gananciaId,
        num_nota:this.gan[0].num_nota,
        tipo_pago:this.gan[0].tipo_pago,
        cantidad:this.gan[0].cantidad,
        concepto:this.gan[0].concepto,
        status:this.gan[0].status,
        id_cliente:this.gan[0].id_cliente,
        recibio:this.gan[0].recibio,
        fecha: fecha,
        nombre:this.gan[0].nombre,
        ape_pat:this.gan[0].ape_pat,
        ape_mat:this.gan[0].ape_mat
      });
    }
    );
  }

  editar(){
    console.log(this.editForm.value);
   
    this.gananciasservicio.editganancia(this.editForm.value).subscribe(
      res => {
        console.log("editar res: ");
        console.log(res); 
      }
    );
    Swal.fire('Registro Actualizado Exitosamente');
    this.getganancias();
  }

  borrar(){
    console.log(this.editForm.value);
    this.gananciasservicio.deleteganancia(this.editForm.value).subscribe(
      res => {
        console.log(res); 
      }
    );
    Swal.fire('Registro Eliminado Exitosamente');
    this.getganancias();
  }

}
