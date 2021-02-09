import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reportesForm;
  reportesemForm;
  f_rep;
  reportes;
  repsem;
  abrirDetalles: Boolean;
  abrirGraficas: Boolean;
  semana: Boolean;

  constructor(private reporteservicio: ServicioService,private formBuilder: FormBuilder) {
    this.reportesForm = this.formBuilder.group({
      f_rep: '',
      total:'',
      nfecha:''
    });
    this.reportesemForm = this.formBuilder.group({
      f_rep: '',
      total:'',
      nfecha:''
    });
   }

  ngOnInit(): void {
    this.abrirDetalles = true;
  }

  /*abrirsemanal(item:any){
    console.log("aqui si")
    this.abrirGraficas = false;
   
    $("#myModals").modal("show");
  }

  onSubmit(event) {
    if (event.submitter.name == "Repmensual") {
      this.Repmensual();
    } else if (event.submitter.name == "Repanual") {
      this.Repanual();
    } else if (event.submitter.name == "Repsemanal") {
      this.Repsemanal('f_rep');
    } 
  }*/

  Repsemanal(f_rep){
    console.log("si entre");
    this.reporteservicio.getreportes(f_rep).subscribe(
      res => {
        console.log(res);
        this.repsem = res[0];
      //  $("#myModals").modal("show");
  });
}
  
  Repmensual(){
    this.reporteservicio.getreporte().subscribe(
      res => {
        console.log(res);
        this.reportes = res[0];
      }
    );
    this.abrirDetalles = false;
    this.abrirGraficas = true;
    $("#myModal").modal("show");
  }

  Repanual(){
    this.reporteservicio.getreportea().subscribe(
      res => {
        console.log(res);
        this.reportes = res[0];
      }
    );
    this.abrirDetalles = false;
    this.abrirGraficas = false;
    $("#myModal").modal("show");
  }



}
