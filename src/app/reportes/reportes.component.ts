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
  //semana: Boolean;
  total;
  semana;
  mes;
  aanio;
  repst = 0;
  diariof;
  diarioc;
  tipo;

  constructor(private reporteservicio: ServicioService) {
   }
  ngOnInit(): void { 
    
  }

  Repdiario() {
    this.diariof = $('#daily').val();
    this.reporteservicio.gananciadiaria(this.diariof).subscribe(res => {
      console.log(res);
      if (res[0].diario === null){
        this.repst = 2;
      }
      else {
        this.diarioc = res[0].diario;
        this.repst = 1;
      }
    });
  }

  Repsemanal(){
    console.log("si entre");
    var date = new Date($('#f_rep').val());
   // console.log(date);
    var d=date.getDate()+1;
    var m= date.getMonth()+1;
    var a= date.getUTCFullYear();
    var fechita=a+"-"+m+"-"+d
    console.log(fechita);
    var valor = $('#temporada').val();
    switch(valor){
      case 'Semana':
        this.tipo =1;
        this.reporteservicio.getreportes(fechita).subscribe(
          res => {
            console.log(res[0][0].total);
            this.f_rep=fechita;
            this.total=res[0][0].total;
            
           // this.repsem = res[0];
           //console.log()
      });
        console.log("-------->"+valor);
        console.log(this.tipo);
     
        break;
       case 'Mes':
        console.log("-------->"+valor);
        this.reporteservicio.getreporte().subscribe(
          res => {
            console.log("mes: ");
            console.log(res[0]);
            this.mes=res[0];
            console.log(this.mes[0]);

      });
      this.tipo =2;
         break;
       case 'Año':
        this.reporteservicio.getreportea().subscribe(
          res => {
            console.log(res[0]);
            this.aanio=res[0];
      });
        console.log("-------->"+valor);
        
        this.tipo =3;
         break;   
    }
  
}
  




}