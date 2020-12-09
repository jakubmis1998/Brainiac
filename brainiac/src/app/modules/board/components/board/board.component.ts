import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from 'src/app/modules/board/services/api.service';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartGuy } from '../../interfaces/smart-guy';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {

  people: SmartGuy[];
  columns = ['Id', '', 'First name', 'Last name', 'E-mail', ''];
  pagination = { page: 1, per_page: 0, total: 0 };
  loading = false;
  allSubscription = new Subscription();

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private toastService: ToastService,
    private cdk: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getBrainiacs();
  }

  updatePage(currentPage: number): void {
    this.pagination.page = currentPage;
    this.getBrainiacs();
  }

  ngOnDestroy(): void {
    this.allSubscription.unsubscribe();
  }

  getBrainiacs(): void {
    this.loading = true;
    this.allSubscription.add(
      this.apiService.getBrainiacs(this.pagination).subscribe(
        result => {
          this.people = result.data;
          this.pagination.page = result.page;
          this.pagination.per_page = result.per_page;
          this.pagination.total = result.total;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.toastService.errorToast(error);
        },
        () => {
          this.cdk.markForCheck();
        }
      )
    );
  }

  openAddBrainiacModal(): void {
    const modalRef = this.modalService.open(FormDialogComponent, { centered: true });
    modalRef.componentInstance.title = 'Add new brainiac';
    modalRef.result.then(
      response => {
        /* OnPush - change reference, not value */
        this.people = [response, ...this.people] as SmartGuy[];
        this.toastService.successToast('New brainiac created!');
        this.cdk.markForCheck();
      },
      () => {}
    );
  }

  editBrainiac(editedGuyData: SmartGuy) {
    let editedGuy = this.people.find(guy => guy.id === editedGuyData.id);
    /* Kwestia niespójności nazw w response z API (first_name, firstName) */
    editedGuy.first_name = editedGuyData.first_name;
    editedGuy.last_name = editedGuyData.last_name;
    editedGuy.email = editedGuyData.email;
    this.toastService.successToast('Brainiac updated!');
  }

  removeBrainiac(id: number) {
    this.people = this.people.filter(guy => guy.id !== id);
    this.toastService.successToast('Brainiac removed!');
  }
}
