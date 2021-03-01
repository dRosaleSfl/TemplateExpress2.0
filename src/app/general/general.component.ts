import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from './../servicios/servicio.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  usaurio2:any;
  constructor(public router: ActivatedRoute,private servicio:ServicioService) {}
  usr;
  tipo;
   public boolean = true;
    inv:boolean=false;
    ven:boolean=false;
    cli:boolean=false;
    emp:boolean=false;
    pro:boolean=false;
    fal:boolean=false;
    rep:boolean=false;
    repro:boolean=false;
    lp:boolean=false;
    gan:boolean=false;
  

  ngOnInit(): void {
    this.usr = sessionStorage.getItem("usrname");
    this.tipo = sessionStorage.getItem("tipo");
    console.log("Tipo: ");
    console.log(this.tipo);
  }

  vista(elemento:string){
    console.log(elemento);
  
    switch(elemento){
      case 'clientes':{
        this.cli=true;
        this.emp=false;
        this.pro=false;
        this.ven=false;
        this.inv=false;
        this.rep=false;
        this.repro=false;
        this.lp=false;
        this.fal=false;
        this.gan=false;
        break
      }
      case 'empleados':{
        this.emp=true;
        this.cli=false;
        this.pro=false;
        this.fal=false;
        this.ven=false;
        this.inv=false;
        this.rep=false;
        this.repro=false;
        this.lp=false;
        this.gan=false;
        break
      }
      case 'proveedores':{
        this.pro=true;
        this.emp=false;
        this.cli=false;
        this.fal=false;
        this.ven=false;
        this.inv=false;
        this.rep=false;
        this.repro=false;
        this.lp=false;
        this.gan=false;
        break
      }
      case 'ventas':{
        this.ven=true;
        this.emp=false;
        this.pro=false;
        this.fal=false;
        this.cli=false;
        this.inv=false;
        this.rep=false;
        this.repro=false;
        this.lp=false;
        this.gan=false;
        break
      }
      case 'inventario':{
        this.inv=true;
        this.emp=false;
        this.pro=false;
        this.fal=false;
        this.ven=false;
        this.cli=false;
        this.rep=false;
        this.repro=false;
        this.lp=false;
        this.gan=false;
        break
      }
      case 'faltantes':{
        this.fal=true;
        this.lp=false;
        this.repro=false;
        this.rep=false;
        this.inv=false;
        this.emp=false;
        this.pro=false;
        this.ven=false;
        this.cli=false;
        this.gan=false;
        break
      }
      case 'reportes':{
        this.rep=true;
        this.inv=false;
        this.emp=false;
        this.pro=false;
        this.fal=false;
        this.ven=false;
        this.cli=false;
        this.repro=false;
        this.lp=false;
        this.gan=false;
        break
      }
      case 'reproducto':{
        this.repro=true;
        this.rep=false;
        this.inv=false;
        this.emp=false;
        this.pro=false;
        this.fal=false;
        this.ven=false;
        this.cli=false;
        this.lp=false;
        this.gan=false;
        break
      }
      case 'lista-precios':{
        this.lp=true;
        this.repro=false;
        this.rep=false;
        this.inv=false;
        this.emp=false;
        this.pro=false;
        this.fal=false;
        this.ven=false;
        this.cli=false;
        this.gan=false;
        break
      }
      
      case 'ganancias':{
        this.lp=false;
        this.repro=false;
        this.rep=false;
        this.inv=false;
        this.emp=false;
        this.pro=false;
        this.fal=false;
        this.ven=false;
        this.cli=false;
        this.gan=true;
        break
      }
      }
    }
      
    logout(){
      this.servicio.bandera();
      sessionStorage.clear();
    }

}
