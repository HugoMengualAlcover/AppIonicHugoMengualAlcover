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
      },
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module').then( m => m.CategoriasPageModule)
      },
      {
        path: 'buscar',
        loadChildren: () => import('../buscar/buscar.module').then( m => m.BuscarPageModule)
      },
      {
        path: 'serie/:id',
        loadChildren: () => import('../serie/serie.module').then( m => m.SeriePageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
