import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {ServicioService} from '../servicios/servicio.service';
import Swal from 'sweetalert2';
import { FormBuilder,Validators} from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  tipo = sessionStorage.getItem("tipo");
  clientesCompleto;
  clientForm: any;
  clientes;
  clientes1;
  mcliente;
  addclientForm: any;
  clientesBusqueda;
  copia= true;
  public copia1 = false;
  public indice = true;
  public indice1 = false;
  constructor(private clienteservicio: ServicioService, private formBuilder: FormBuilder) {
    this.clientForm = this.formBuilder.group({
      nombre_cliente: ['',Validators.required],
      ape_pat:['',Validators.required],
      ape_mat: ['',Validators.required],
      tipo: ['',Validators.required],
      correo: ['',Validators.required],
      calle: ['',Validators.required],
      num_int: ['',Validators.required],
      num_ext: ['',Validators.required],
      colonia: ['',Validators.required],
      cp: ['',Validators.required],
      ciudad: ['',Validators.required],
      estado: ['',Validators.required],
      pais: ['',Validators.required],
      telefono: ['',Validators.required],
      rfc: ['',Validators.required]
    });
    this.addclientForm = this.formBuilder.group({
      id_cliente: ['',Validators.required],
      nombre_cliente: ['',Validators.required],
      ape_pat: ['',Validators.required],
      ape_mat:['',Validators.required],
      tipo: ['',Validators.required],
      correo: ['',Validators.required],
      calle: ['',Validators.required],
      num_int: ['',Validators.required],
      num_ext: ['',Validators.required],
      colonia: ['',Validators.required],
      cp: ['',Validators.required],
      ciudad: ['',Validators.required],
      estado: ['',Validators.required],
      pais: ['',Validators.required],
      telefono: ['',Validators.required],
      rfc: ['',Validators.required]
    });
   }
  
  ngOnInit() {
   // tslint:disable-next-line: no-unused-expression
   this.getcliente();
  }

  getcliente() {
    
    this.clienteservicio.getusuario().subscribe(
      res => {
        console.log(res);
        this.clientes = res;
        this.clientesBusqueda = res;
      }
    );
    

  }
  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.clientes = this.clientesBusqueda;
    } else {
      this.clientes = this.clientesBusqueda.filter((cliente: { id_cliente: string | string[]; nombre: string; ape_pat: string; ape_mat: string; }) =>
        cliente.id_cliente.toString().includes(filterValueLower) ||
        cliente.nombre.toLowerCase().includes(filterValueLower) ||
        cliente.ape_pat.toLowerCase().includes(filterValueLower) ||
        cliente.ape_mat.toLowerCase().includes(filterValueLower)
      );
    }
  }

 
  vercliente(item: any) {
    let clienteId;
    clienteId = item.id_cliente;
    console.log(clienteId);
    this.clienteservicio.getclient(clienteId).subscribe(res => {
      console.log(res);
      this.mcliente = res;
      this.addclientForm.setValue({
      id_cliente: clienteId ,
      nombre_cliente: this.mcliente[0].nombre,
      ape_pat: this.mcliente[0].ape_pat,
      ape_mat: this.mcliente[0].ape_mat,
      tipo: this.mcliente[0].tipo,
      correo: this.mcliente[0].correo,
      calle: this.mcliente[0].calle,
      num_int: this.mcliente[0].num_int,
      num_ext: this.mcliente[0].num_ext,
      colonia: this.mcliente[0].colonia,
      cp: this.mcliente[0].cp,
      ciudad: this.mcliente[0].ciudad,
      estado: this.mcliente[0].estado,
      pais: this.mcliente[0].pais,
      telefono: this.mcliente[0].telefono,
      rfc: this.mcliente[0].rfc
     });
      console.log(this.addclientForm.value);
    }
    );
  }
  editar() {
    if(this.addclientForm.valid){
      console.log(this.addclientForm.value);
      this.clienteservicio.ediclient(this.addclientForm.value).subscribe(
        res => {
          console.log(res); 
        }
      );
      Swal.fire('Cliente Actualizado Exitosamente');
     }else{
      Swal.fire('Campos Vacios');
     }
    this.getcliente();
  }
  
  borrar(){
    console.log(this.addclientForm.value);
    this.clienteservicio.deleteClient(this.addclientForm.value).subscribe(
      res => {
        console.log(res); 
      });
    Swal.fire('Cliente Eliminaddo Exitosamente');
    this.getcliente();
    this.getcliente();
    this.getcliente();
   
  }

  


 
  newcliente(){
    if(this.clientForm.valid){
      console.log(this.clientForm.value);
      this.clienteservicio.addClient(this.clientForm.value).subscribe(
        res => {
          console.log(res); 
        }
      );
      Swal.fire('Cliente Agreado Exitosamente');
     }else{
      Swal.fire('Campos Vacios');
     }
  }
}
