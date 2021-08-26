import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuiasRoutingModule } from './guias-routing.module';
import { GuiasComponent } from './pages/guias/guias.component';
import { GuiasCreateComponent } from './pages/guias-create/guias-create.component';
import { GuiasEditComponent } from './pages/guias-edit/guias-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GuiasComponent,
    GuiasCreateComponent,
    GuiasEditComponent
  ],
  imports: [
    CommonModule,
    GuiasRoutingModule,
    ReactiveFormsModule
  ]
})
export class GuiasModule { }
