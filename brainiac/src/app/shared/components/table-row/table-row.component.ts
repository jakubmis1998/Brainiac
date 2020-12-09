import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ConfirmationModalComponent } from '../../../modules/board/components/confirmation-modal/confirmation-modal.component';
import { FormDialogComponent } from '../../../modules/board/components/form-dialog/form-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartGuy } from 'src/app/modules/board/interfaces/smart-guy';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: [ './table-row.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {

  @Input() rowData: SmartGuy;
  @Output() removeEvent = new EventEmitter<number>();
  @Output() editEvent = new EventEmitter<SmartGuy>();

  constructor(private modalService: NgbModal) { }

  deleteBrainiac(id: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Exit confirmation';
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.message = 'Are you sure you want to delete this smart guy?';
    modalRef.result.then(
      () => {
        this.removeEvent.emit(id);
      },
      () => {}
    );
  }

  editBrainiac() {
    const modalRef = this.modalService.open(FormDialogComponent, { centered: true });
    modalRef.componentInstance.editedGuy = this.rowData;
    modalRef.componentInstance.title = 'Edit brainiac';
    modalRef.result.then(
      data => {
        data.id = this.rowData.id;
        this.editEvent.emit(data);
      },
      () => {}
    );
  }

}
