import { ServicioService } from './../servicios/servicio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 
  constructor(private service :ServicioService) { }
  bandera:boolean=false;
  ngOnInit(){
    console.log(this.bandera);
   this.service.change.subscribe(bandera=>{
    this. bandera =  bandera;
   });
   console.log(this.bandera);
  }
  

}
