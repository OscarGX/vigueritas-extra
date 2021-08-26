import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitantesRoutingModule } from './visitantes-routing.module';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { VisitanteCrearComponent } from './pages/visitante-crear/visitante-crear.component';
import { VisitanteEditarComponent } from './pages/visitante-editar/visitante-editar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VisitantesComponent,
    VisitanteCrearComponent,
    VisitanteEditarComponent
  ],
  imports: [
    CommonModule,
    VisitantesRoutingModule,
    ReactiveFormsModule
  ]
})
export class VisitantesModule { }
