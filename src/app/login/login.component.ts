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
      contra: '',
      tipo:1
    });
    this.sesionv = this.formBuilder.group({
      username: '',
      contra: '',
      tipo:''
    });
   }
 
  ngOnInit() {
  }
  login(){
   // console.log(this.sesion.value);
    this.servicio.validar(this.sesion.value).subscribe(
      res => {
        console.log(res);
        this.user=res;
        this.vaaalidar=res;
        console.log(this.user);
        console.log(this.vaaalidar[0].nombre_usuario);
        console.log(this.sesion.value);
        if(this.vaaalidar[0].nombre_usuario==this.sesion.value.username){
          Swal.fire('cool');
          this.login1();
        }else{
          Swal.fire('notcool');
        }
      }
    );
    
  }
  
  login1(){

    this.servicio.bandera();
    //console.log(this.sesion.value);
    console.log(this.sesion.value.tipo);
    if(this.sesion.value.tipo==1){
        console.log("into");
        this.servicio.usuariooo();

    }
  }
  logout(){
    this.servicio.bandera();
  
  }

}
