import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./admins/admins.module').then(m => m.AdminsModule)
  },
  {
    path: 'visitantes',
    loadChildren: () => import('./visitantes/visitantes.module').then(m => m.VisitantesModule)
  },
  {
    path: 'guias',
    loadChildren: () => import('./guias/guias.module').then(m => m.GuiasModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
