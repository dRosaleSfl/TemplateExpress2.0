import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormControl, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GeneralComponent } from './general/general.component';
import { ListasComponent } from './listas/listas.component';
import { VentasComponent } from './ventas/ventas.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ListaPreciosComponent } from './lista-precios/lista-precios.component';
import { InventarioComponent } from './inventario/inventario.component';
import { PedidoComponent } from './pedido/pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { ReportesComponent } from './reportes/reportes.component';
import { ReproductoComponent } from './reproducto/reproducto.component';
import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './nav/nav.component';
import { FaltantesComponent } from './faltantes/faltantes.component';
import { GananciasComponent } from './ganancias/ganancias.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    GeneralComponent,
    ListasComponent,
    VentasComponent,
    EmpleadosComponent,
    ClientesComponent,
    ProveedoresComponent,
    ListaPreciosComponent,
    InventarioComponent,
    PedidoComponent,
    ReportesComponent,
    ReproductoComponent,
    NavComponent,
    FaltantesComponent,
    GananciasComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
