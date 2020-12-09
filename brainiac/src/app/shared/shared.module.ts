import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { TableRowComponent } from './components/table-row/table-row.component';

@NgModule({
  declarations: [
    TableComponent,
    TableRowComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    TableComponent,
    TableRowComponent
  ]
})
export class SharedModule { }
