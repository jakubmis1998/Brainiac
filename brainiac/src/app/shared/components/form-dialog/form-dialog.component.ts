import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ApiService } from 'src/app/modules/board/services/api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartGuy } from 'src/app/modules/board/interfaces/smart-guy';
import { Subscription } from 'rxjs';
import { ToastService } from 'src/app/modules/board/services/toast.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit, OnDestroy {

  @Input() editedGuy: SmartGuy;
  @Input() title: string;

  brainiacForm = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl('')
  });
  submitted = false;
  loading = false;
  allSubscription = new Subscription();

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

  constructor(public activeModal: NgbActiveModal, private apiService: ApiService, private toastService: ToastService) {}

  submit(): void {
    this.loading = true;
    this.submitted = true;
    if (this.brainiacForm.valid) {
      /* Edit */
      if (this.editedGuy) {
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
      } else {
        /* Create */
        this.allSubscription.add(
          this.apiService.addBrainiac(this.brainiacForm.value as SmartGuy).subscribe(
            newBrainiac => {
              /* Custom avatar */
              newBrainiac.avatar = 'assets/user.png';
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
    } else {
      this.loading = false;
    }
  }

  isValid(field: string): boolean {
    return (this.brainiacForm.controls[field].touched || this.submitted) && this.brainiacForm.controls[field].errors?.required;
  }

}
