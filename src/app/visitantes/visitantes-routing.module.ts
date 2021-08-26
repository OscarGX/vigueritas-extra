import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitantesComponent } from './pages/visitantes/visitantes.component';
import { VisitanteCrearComponent } from './pages/visitante-crear/visitante-crear.component';
import { VisitanteEditarComponent } from './pages/visitante-editar/visitante-editar.component';

const routes: Routes = [
  {
    path: '',
    component: VisitantesComponent
  },
  {
    path: 'nuevo',
    component: VisitanteCrearComponent
  },
  {
    path: 'edit/:id',
    component: VisitanteEditarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitantesRoutingModule { }
