import { ApiService } from './services/api.service';
import { BoardComponent } from './components/board/board.component';
import { BoardRoutingModule } from './board-routing.module';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FormDialogComponent } from './components/form-dialog/form-dialog.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BoardComponent,
    FormDialogComponent,
    ConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [ ApiService ]
})
export class BoardModule { }
