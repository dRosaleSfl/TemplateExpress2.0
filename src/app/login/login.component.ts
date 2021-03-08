import { ServicioService } from './../servicios/servicio.service';
import { Router, RouterModule } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GeneralComponent } from '../general/general.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  sesion: any;
  @Input() general:GeneralComponent;
  sesionv: any;
  user;
  u;
  c;
  t;
  vaaalidar;
  constructor(private router:Router, private servicio:ServicioService, private formBuilder: FormBuilder) {
    this.sesion = this.formBuilder.group({
      username: '',
      contra: ''
    });
    this.sesionv = this.formBuilder.group({
      username: '',
      contra: ''
    });
   }
 
  ngOnInit() {
  }
  login(){
    this.servicio.validar(this.sesion.value).subscribe(res => {
      console.log(res);
      let restxt = JSON.stringify(res[0]);
      console.log(restxt);
      if (restxt===undefined){
        Swal.fire('Usuario y/o Contraseña incorrectos');
      }
      else{
        console.log(res);
        sessionStorage.setItem("usrname", res[0].nombre_usuario);
        sessionStorage.setItem("tipo", res[0].puesto);
        Swal.fire('Usted ha ingresado');
        this.servicio.bandera();
      }
    });
  }
}