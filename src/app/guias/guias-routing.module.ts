import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiasComponent } from './pages/guias/guias.component';
import { GuiasCreateComponent } from './pages/guias-create/guias-create.component';
import { GuiasEditComponent } from './pages/guias-edit/guias-edit.component';

const routes: Routes = [
  {
    path: '',
    component: GuiasComponent
  },
  {
    path: 'nuevo',
    component: GuiasCreateComponent
  },
  {
    path: 'edit/:id',
    component: GuiasEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuiasRoutingModule { }
