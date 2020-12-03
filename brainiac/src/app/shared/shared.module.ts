import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { TopbarComponent } from './components/topbar/topbar.component';

@NgModule({
  declarations: [
    TopbarComponent,
    TableComponent,
    TableRowComponent,
    FormDialogComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    TopbarComponent,
    TableComponent,
    TableRowComponent
  ]
})
export class SharedModule { }
