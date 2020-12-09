import { CommonModule } from '@angular/common';
import { DefaultComponent } from './components/default/default.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [
    DefaultComponent,
    TopbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DefaultComponent,
    TopbarComponent
  ]
})
export class DefaultModule { }
