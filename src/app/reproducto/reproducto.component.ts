import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';


declare var $: any;

@Component({
  selector: 'app-reproducto',
  templateUrl: './reproducto.component.html',
  styleUrls: ['./reproducto.component.css']
})
export class ReproductoComponent implements OnInit {
  reportesForm: FormGroup;
  reportesFormDefault = {
    mas: '',
    id_herraje:'',
    nombre:'',
    marca:''
  }
  reportes;
  repclientes;
  abrirDetalles: Boolean;
  
  constructor(private reproductoservicio: ServicioService,private formBuilder: FormBuilder) {
    this.reportesForm = this.formBuilder.group(this.reportesFormDefault);
   }

  ngOnInit(): void {
  }

  onSubmit(event) {
    if (event.submitter.name == "Pedfaltante") {
      console.log("yas");
      this.Repfaltante();
    } else if (event.submitter.name == "Pedvendido") {
      this.Repvendido();
    } else if (event.submitter.name == "Procaro"){
      this.Repcaro();
    } else if (event.submitter.name == "Clientemcompras"){
      this.Clientemcompras();
    }
  }

  Repfaltante(){
    this.reproductoservicio.mpedido().subscribe(
      res => {
        console.log(res);
        this.reportes = res;
      }
    );
    this.abrirDetalles = true;
    $("#myModal").modal("show");
  }

  Repvendido(){
    this.reproductoservicio.mvendido().subscribe(
      res => {
        console.log(res);
        this.reportes = res;
      }
    );
    this.abrirDetalles = true;
    $("#myModal").modal("show");
  }

  Repcaro(){
  this.reproductoservicio.mcaro().subscribe(
        res => {
          console.log(res);
          this.reportes = res[0];
        }
      );
      this.abrirDetalles = true;
      $("#myModal").modal("show");
  }

  Clientemcompras(){
    console.log("si");
    this.reproductoservicio.clientemcompras().subscribe(
      res => {
        console.log(res);
        this.repclientes = res;
      }
    );
    this.abrirDetalles = false;
  }

  }
