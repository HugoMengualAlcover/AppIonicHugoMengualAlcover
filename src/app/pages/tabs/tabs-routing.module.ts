import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path:'',
        redirectTo: 'inicio',
        pathMatch:'full'
      },
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },/*,
      {
        path: 'visualizar-categorias',
        loadChildren: () => import('../visualizar-categorias/visualizar-categorias.module').then( m => m.VisualizarCategoriasPageModule)
      },*/
      {
        path: 'buscar-series',
        loadChildren: () => import('../buscar/buscar.module').then( m => m.BuscarPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
