import { RouterModule, Routes } from '@angular/router';

import { BoardComponent } from './modules/board/board.component';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'board', component: BoardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
