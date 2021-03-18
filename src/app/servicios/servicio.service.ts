import {  EventEmitter,Injectable, Output } from '@angular/core';

// tslint:disable-next-line: import-spacing
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private httpClient: HttpClient) { }
  banderita:boolean =false;
  usuario1:boolean=false;
  // tslint:disable-next-line: no-output-native
  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() change1: EventEmitter<boolean> = new EventEmitter();

  //clientes
  getusuario(){
    return this.httpClient.get('/basedatos-api/clientes');
  }
  getclient(id:string){
    return this.httpClient.get(`/basedatos-api/client?id=${id}`);
  }
  addClient(cliente:any){
    let nombre = cliente.nombre_cliente;
    let apepat =cliente.ape_pat;
    let apemat = cliente.ape_mat;
    let telefono =cliente.telefono;
    let rfc = cliente.rfc;
    let razonsocial =cliente.razonsocial;
    let tipo =cliente.tipo;
    let correo =cliente.correo;
    let calle =cliente.calle;
    let numint =cliente.num_int;
    let numext =cliente.num_ext;
    let colonia =cliente.colonia;
    let cp =cliente.cp;
    let ciudad =cliente.ciudad;
    let estado =cliente.estado;
    let pais =cliente.pais;
    return this.httpClient.get(`/basedatos-api/newclient?nombre=${nombre}&apepat=${apepat}&apemat=${apemat}&telefono=${telefono}&rfc=${rfc}&razonsocial=${razonsocial}&tipo=${tipo}&correo=${correo}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}`);
  
   }
   deleteClient(cliente:any){
    let id = cliente.id_cliente;
    return this.httpClient.get(`/basedatos-api/deletclient?id=${id}`);
   }
   ediclient(cliente:any){
    let id = cliente.id_cliente;
    let nombre = cliente.nombre_cliente;
    let apepat =cliente.ape_pat;
    let apemat = cliente.ape_mat;
    let telefono =cliente.telefono;
    let rfc = cliente.rfc;
    let razonsocial =cliente.razonsocial;
    let tipo =cliente.tipo;
    let correo =cliente.correo;
    let calle =cliente.calle;
    let numint =cliente.num_int;
    let numext =cliente.num_ext;
    let colonia =cliente.colonia;
    let cp =cliente.cp;
    let ciudad =cliente.ciudad;
    let estado =cliente.estado;
    let pais =cliente.pais;
    console.log(cliente);
    console.log(apepat);
  // return this.httpClient.get(`http://localhost:3000/updateclient?nombre=${nombre}&apepat=${apemat}&apemat=${apemat}&telefono=${telefono}&rfc=${rfc}&razonsocial=${razonsocial}&tipo=${tipo}&correo=${correo}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}&id=${id}`);
  return this.httpClient.get(`/basedatos-api/updateclient?id=${id}&nombre=${nombre}&apepat=${apepat}&apemat=${apemat}&telefono=${telefono}&rfc=${rfc}&razonsocial=${razonsocial}&tipo=${tipo}&correo=${correo}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}`);

  }

//----------------------------------empleados-------------------------------
  getempleados(){
    return this.httpClient.get('/basedatos-api/empleados');
  }
  getempleado(id:string){
    return this.httpClient.get(`/basedatos-api/empleado?id=${id}`);
  }
  addempleado(empleado:any){
    let nombre = empleado.nombre_empleado;
    let apepat =empleado.ape_pat;
    let apemat = empleado.ape_mat;
    let telefono =empleado.telefono;
    let nombreu =empleado.nombre_usuario;
    let puesto =empleado.puesto;
    let contra =empleado.contrasena;
    let calle =empleado.calle;
    let numint =empleado.num_int;
    let numext =empleado.num_ext;
    let colonia =empleado.colonia;
    let cp =empleado.cp;
    let ciudad =empleado.ciudad;
    let estado =empleado.estado;
    let pais =empleado.pais;
    console.log(nombre,apepat,apemat,telefono,calle,numint,numext,colonia,cp,ciudad,estado,pais,nombreu,contra,puesto);
    return this.httpClient.get(`/basedatos-api/newempleado?nombre=${nombre}&apepat=${apepat}&apemat=${apemat}&telefono=${telefono}&puesto=${puesto}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}&nombreu=${nombreu}&contra=${contra}`);
  
  }
  deletempleado(empleado:any){
    let id = empleado.id_empleado;
    return this.httpClient.get(`/basedatos-api/dempleado?id=${id}`);
   }

   editempleado(empleado:any){
     let id=empleado.id_empleado;
    let nombre = empleado.nombre_empleado;
    let apepat =empleado.ape_pat;
    let apemat = empleado.ape_mat;
    let telefono =empleado.telefono;
    let nombreu =empleado.nombre_usuario;
    let puesto =empleado.puesto;
    let contra =empleado.contrasena;
    let calle =empleado.calle;
    let numint =empleado.num_int;
    let numext =empleado.num_ext;
    let colonia =empleado.colonia;
    let cp =empleado.cp;
    let ciudad =empleado.ciudad;
    let estado =empleado.estado;
    let pais =empleado.pais;
    console.log(nombre,apepat,apemat,telefono,calle,numint,numext,colonia,cp,ciudad,estado,pais,nombreu,contra,puesto);
    return this.httpClient.get(`/basedatos-api/updateempleado?id=${id}&nombre=${nombre}&apepat=${apepat}&apemat=${apemat}&telefono=${telefono}&puesto=${puesto}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}&nombreu=${nombreu}&contra=${contra}`);
  }

 ///--------------------------proveedores
  getproveedores(){
  return this.httpClient.get('/basedatos-api/proveedores');
  }
  getproveedor(id:string){
   return this.httpClient.get(`/basedatos-api/proveedor?id=${id}`);
  }
  addprovedor(proveedor:any){
    let nombre = proveedor.nombre_proveedor;
    let apepat =proveedor.ape_pat;
    let apemat =proveedor.ape_mat;
    let telefono =proveedor.telefono;
    let rfc = proveedor.rfc;
    let razonsocial =proveedor.razon_social;
    let tipo =proveedor.tipo;
    let correo =proveedor.correo;
    let calle =proveedor.calle;
    let numint =proveedor.num_int;
    let numext =proveedor.num_ext;
    let colonia =proveedor.colonia;
    let cp =proveedor.cp;
    let ciudad =proveedor.ciudad;
    let estado =proveedor.estado;
    let pais =proveedor.pais;
    return this.httpClient.get(`/basedatos-api/newproveedor?nombre=${nombre}&apepat=${apepat}&apemat=${apemat}&telefono=${telefono}&rfc=${rfc}&razonsocial=${razonsocial}&tipo=${tipo}&correo=${correo}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}`);
  
  }
  deletproveedor(proveedor:any){
    let id = proveedor.id_proveedor;
    return this.httpClient.get(`/basedatos-api/dproveedor?id=${id}`);
   }

   editproveedor(proveedor:any){
     let id =proveedor.id_proveedor;
    let nombre = proveedor.nombre_proveedor;
    let apepat =proveedor.ape_pat;
    let apemat =proveedor.ape_mat;
    let telefono =proveedor.telefono;
    let rfc = proveedor.rfc;
    let razonsocial =proveedor.razon_social;
    let tipo =proveedor.tipo;
    let correo =proveedor.correo;
    let calle =proveedor.calle;
    let numint =proveedor.num_int;
    let numext =proveedor.num_ext;
    let colonia =proveedor.colonia;
    let cp =proveedor.cp;
    let ciudad =proveedor.ciudad;
    let estado =proveedor.estado;
    let pais =proveedor.pais;
    console.log(nombre,apepat,apemat,telefono,calle,numint,numext,colonia,cp,ciudad,estado,pais,);
    return this.httpClient.get(`/basedatos-api/updateproveedor?id=${id}&nombre=${nombre}&apepat=${apepat}&apemat=${apemat}&telefono=${telefono}&rfc=${rfc}&razonsocial=${razonsocial}&tipo=${tipo}&correo=${correo}&calle=${calle}&numint=${numint}&numext=${numext}&colonia=${colonia}&cp=${cp}&ciudad=${ciudad}&estado=${estado}&pais=${pais}`);
  
  }
//-------------------------------------------invetnario
  getinventario(){
    return this.httpClient.get('/basedatos-api/inventario');
    }
    getproducto(id:string){
     return this.httpClient.get(`/basedatos-api/producto?id=${id}`);
    }
    deletproducto(producto:any){
      let id = producto.id_herraje;
      console.log(id);
     return this.httpClient.get(`/basedatos-api/dproducto?id=${id}`);
    }
    addproducto(producto:any){
      let id = producto.id_herraje;
      let nombre = producto.nombre;
      let marca= producto.marca;
      let cvidrio=producto.preciocvidrio;
      let svidrio= producto.preciosvidrio;
      let existencias = producto.existencias;
      let min = producto.min;
      console.log(producto);
     return this.httpClient.get(`/basedatos-api/newproducto?id=${id}&nombre=${nombre}&marca=${marca}&cvidrio=${cvidrio}&svidrio=${svidrio}&existencias=${existencias}&min=${min}`);
    }
    editproducto(producto:any){
      let id = producto.id_inventario;
      let id_herraje = producto.id_herraje;
      let nombre = producto.nombre;
      let marca= producto.marca;
      let cvidrio=producto.preciocvidrio;
      let svidrio= producto.preciosvidrio;
      let existencias = producto.existencias;
      let min = producto.min;
      console.log(producto);
     return this.httpClient.get(`/basedatos-api/upadateproducto?id=${id}&id_herraje=${id_herraje}&nombre=${nombre}&marca=${marca}&cvidrio=${cvidrio}&svidrio=${svidrio}&existencias=${existencias}&min=${min}`);
    }
//--------------------precios-----
getprecios(){
  return this.httpClient.get('/basedatos-api/precios');
  }
  getprecio(precio:any){
    let id = precio.id_listaprecios;
     let id2=precio.id_herraje;
     let id1=precio.id_proveedor;
     console.log(id);
     console.log(id1);
   return this.httpClient.get(`/basedatos-api/precio?id=${id}&id1=${id1}&id2=${id2}`);
  }
  deletprecio(producto:any){
    let id = producto.id_herraje;
    let id1 = producto.id_proveedor;
    console.log(id);
   return this.httpClient.get(`/basedatos-api/dprecio?id=${id}&id1=${id1}`);
  }
  addprecio(producto:any){
    let id = producto.id_herraje;
    let precio1 =producto.precio_compra;
    let id1 = producto.id_proveedor;
   return this.httpClient.get(`/basedatos-api/newwprecio?id=${id}&precio=${precio1}&id1=${id1}`);
  }
  updtaeprecio(producto:any){
    let id = producto.id_herraje;
    let id1 = producto.id_proveedor;
    let precio1 =producto.precio_compra;
           
   return this.httpClient.get(`/basedatos-api/upadateprecio?id=${id}&id1=${id1}&precio=${precio1}`);
  }
  //-------------------Faltantes-----
  getfaltantes(){
    return this.httpClient.get('/basedatos-api/faltantes');
    }

  getfaltante(faltante:any){
      let id = faltante.id_faltantes;
      let id2=faltante.fecha;
       console.log(id);
     return this.httpClient.get(`/basedatos-api/faltante?id=${id}&id2=${id2}`);
    }

  addFaltantes(faltante:any){
      let id = faltante.id_faltantes;
      let fecha = faltante.fecha;
      let cantidad = faltante.cantidad;
      let id1 = faltante.id_herraje;
      let id2 = faltante.id_proveedor;
      return this.httpClient.get(`/basedatos-api/newfaltantes?id=${id}&id1=${id1}&id2=${id2}&fecha=${fecha}&cantidad=${cantidad}`);
    
     }

    deletefaltante(faltante:any){
      let id = faltante.id_faltantes;
      console.log(id);
     return this.httpClient.get(`/basedatos-api/dfaltante?id=${id}`);
    }

    deleteprod(faltante:any){
      let id1 = faltante.id_producto;
     return this.httpClient.get(`/basedatos-api/dprod?id1=${id1}`);
    }
//-------------------Ganancias-----
getganancias(){
  return this.httpClient.get('/basedatos-api/ganancias');
  }

  addGanancias(ganancia:any){
    let id = ganancia.id_ganancias;
    let num_nota = ganancia.num_nota;
    let tipo_pago = ganancia.tipo_pago;
    let cantidad = ganancia.cantidad;
    let concepto = ganancia.concepto ;
    let status = ganancia.status;
    let recibio = ganancia.recibio;
    let id1 = ganancia.id_cliente;
    let fecha = ganancia.fecha;
    return this.httpClient.get(`/basedatos-api/newganancias?id=${id}&num_nota=${num_nota}&tipo_pago=${tipo_pago}&cantidad=${cantidad}&concepto=${concepto}&status=${status}&recibio=${recibio}&fecha=${fecha}&id1=${id1}`);
   }

   getganancia(id:string){
    return this.httpClient.get(`/basedatos-api/ganancia?id=${id}`);
   }

   editganancia(gan:any){
    let id = gan.id_ganancias;
    let num_nota = gan.num_nota;
    let nombre_cliente = gan.nombre_cliente;
    let ape_pat = gan.ape_pat;
    let ape_mat = gan.ape_mat;
    let id_cliente = gan.id_cliente;
    let tipo_pago = gan.tipo_pago;
    let cantidad = gan.cantidad;
    let concepto = gan.concepto;
    let status = gan.status;
    let recibio = gan.recibio;
    let fecha = gan.fecha;
    console.log(gan);
   return this.httpClient.get(`/basedatos-api/upadateganancia?id=${id}&num_nota=${num_nota}&nombre_cliente=${nombre_cliente}&ape_pat=${ape_pat}&ape_mat=${ape_mat}&id_cliente=${id_cliente}&tipo_pago=${tipo_pago}&cantidad=${cantidad}&concepto=${concepto}&status=${status}&recibio=${recibio}&fecha=${fecha}`);
  }
  
  deleteganancia(gan:any){
    let id = gan.id_ganancias;
    console.log(id);
   return this.httpClient.get(`/basedatos-api/dganancia?id=${id}`);
  }

  //Reporte diario
  gananciadiaria(fecha){
    return this.httpClient.get(`/basedatos-api/gananciasdiarias?id=${fecha}`)
  }

  ///----------------cambio de pantasha
  bandera(){
    console.log(this.banderita);
    this.banderita = !this.banderita ;
    console.log(this.usuario1);
    this.change.emit(this.banderita);
  }
  usuariooo(){
    console.log(this.usuario1);
    this.usuario1 = !this.usuario1 ;
    console.log(this.usuario1);
    this.change1.emit(this.usuario1);
    //return this.usuario1;
  }
  ////-----------------loooogin validar 
  validar(user:any){
    return this.httpClient.get(`/basedatos-api/user?username=${user.username}&contra=${user.contra}`);
  }

  //Reportes
  getreporte() {
    return this.httpClient.get('/basedatos-api/getmensual');
  }
  getreportea() {
    return this.httpClient.get('/basedatos-api/getanual');
  }
  getreportes(fechaaa) {
     let fecha=fechaaa;
    console.log("servicio");
    console.log(fecha);
    console.log(fechaaa+"servicio chido chido");
    return this.httpClient.get(`/basedatos-api/getsemanal?f_rep=${fecha}`);
  }
  mvendido() {
    return this.httpClient.get('/basedatos-api/masvendido');
  }
  mpedido() {
    return this.httpClient.get('/basedatos-api/maspedido');
  }
  mcaro() {
    return this.httpClient.get('/basedatos-api/mascaro');
  }
  clientemcompras(){
    return this.httpClient.get('/basedatos-api/clientemascompras');
  }

  //-----------Servicio añadir pedido----
  addPedido(pedido: any) {
    let id_herraje = pedido.id_herraje;
    let cantidad = pedido.cantidad;
    let precio_unitario = pedido.precio_unitario;
    let tipo_precio = pedido.tipo_precio;
    return this.httpClient.get(`/basedatos-api/newpedido?id_herraje=${id_herraje}&cantidad=${cantidad}&precio_unitario=${precio_unitario}&tipo_precio=${tipo_precio}`);
  }
  // Obtener el id del pedido
  getIdPedido() {
    return this.httpClient.get(`/basedatos-api/getIdPedido`);
  }
  //Servicio mostrar un pedido
  getPedido(id: string) {
    return this.httpClient.get(`/basedatos-api/pedido?id=${id}`);
  }
  //ventas
  getsales() {
    return this.httpClient.get('/basedatos-api/ventas');
  }
  getventas(id: string) {
    return this.httpClient.get(`/basedatos-api/vent?id=${id}`);
  }

  deleteventa(id_ventas: any) {
    return this.httpClient.get(`/basedatos-api/deleteventa?id=${id_ventas}`);
  }
  ediventa(venta: any, id:any) {
    console.log("veeenta---------->")
    console.log(venta);
    console.log("id peeeedido"+id);
    return this.httpClient.post(`/basedatos-api/updateventa?id=${id}`, venta);
  }
  // AGREGAR VENTA
  addVenta(venta: any, inventario: any) {
//    console.log(inventario);
    return this.httpClient.post(`/basedatos-api/addventa?inv=${inventario}`, venta);
  }

  deleteped(producto:any){
    let id1 = producto.id_pedido;
   return this.httpClient.get(`/basedatos-api/dped?id_pedido=${id1}`);
  }

  /* deleteVenta(venta:any){
    let id = venta.id_venta;
    return this.httpClient.get(`http://localhost:3000/deletventa?id=${id}`);
   }*/

}