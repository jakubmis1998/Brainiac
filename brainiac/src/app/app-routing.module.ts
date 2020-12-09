import { RouterModule, Routes } from '@angular/router';

import { DefaultComponent } from './layouts/components/default/default.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'board',
        loadChildren: () => import('./modules/board/board.module').then(m => m.BoardModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
