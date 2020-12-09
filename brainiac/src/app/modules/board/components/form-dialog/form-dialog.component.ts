import { ChangeDetectionStrategy, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from 'src/app/modules/board/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartGuy } from 'src/app/modules/board/interfaces/smart-guy';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: [ './form-dialog.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDialogComponent implements OnInit, OnDestroy {

  @Input() editedGuy: SmartGuy;
  @Input() title: string;

  @HostListener('document:keydown.enter', ['$event'])
  onEnter(event) {
    /* If target is in currently opened modal */
    if (
      document.querySelector('.modal-content').contains(event.target) || // DOMs inside modal
      event.target.classList.contains('modal') // Modal
    ) {
      this.submit();
    }
  }

  brainiacForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl('', Validators.email)
  });
  submitted = false;
  loading = false;
  allSubscription = new Subscription();

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    if (this.editedGuy) {
      this.brainiacForm.setValue({
        first_name: this.editedGuy.first_name,
        last_name: this.editedGuy.last_name,
        email: this.editedGuy.email
      });
    }
  }

  ngOnDestroy(): void {
    this.allSubscription.unsubscribe();
  }

  submit(): void {
    this.loading = true;
    this.submitted = true;
    if (this.brainiacForm.valid) {
      if (this.editedGuy) {
        /* Edit */
        this.closeModalWithEdit();
      } else {
        /* Create */
        this.closeModalWithAdd();
      }
    } else {
      this.loading = false;
    }
  }

  closeModalWithAdd() {
    this.allSubscription.add(
      this.apiService.addBrainiac(this.brainiacForm.value as SmartGuy).subscribe(
        newBrainiac => {
          /* Custom avatar */
          newBrainiac['avatar'] = 'assets/user.png';
          newBrainiac['id'] = +newBrainiac['id'];
          this.loading = false;
          this.activeModal.close(newBrainiac);
        },
        error => {
          this.loading = false;
          this.toastService.errorToast(error);
        }
      )
    );
  }

  closeModalWithEdit() {
    this.allSubscription.add(
      this.apiService.editBrainiac(this.brainiacForm.value as SmartGuy).subscribe(
        newBrainiac => {
          this.loading = false;
          this.activeModal.close(newBrainiac);
        },
        error => {
          this.loading = false;
          this.toastService.errorToast(error);
        }
      )
    );
  }

  isValid(field: string): boolean {
    return (this.brainiacForm.controls[field].touched || this.submitted) && this.brainiacForm.controls[field].errors?.required;
  }

}
