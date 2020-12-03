import { Component, Input } from '@angular/core';

import { ApiService } from 'src/app/modules/board/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/modules/board/services/toast.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent {

  @Input() title: string;
  @Input() message: string;
  @Input() id: number;

  allSubscription = new Subscription();
  loading = false;

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private toastService: ToastService) { }

  submit(): void {
    if (this.title === 'Exit confirmation') {
      this.loading = true;
      this.allSubscription.add(
        this.apiService.deleteBrainiac(this.id).subscribe(
          () => {
            this.loading = false;
            this.activeModal.close('Confirm');
          },
          error => {
            this.toastService.errorToast(error);
          }
        )
      );
    }
  }

}
