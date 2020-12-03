import { Component, OnDestroy, OnInit } from '@angular/core';

import { ApiService } from './services/api.service';
import { FormDialogComponent } from 'src/app/shared/components/form-dialog/form-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartGuy } from './interfaces/smart-guy';
import { Subscription } from 'rxjs';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: [ './board.component.scss' ],
  providers: [ ApiService ]
})
export class BoardComponent implements OnInit, OnDestroy {

  people: SmartGuy[];
  columns = ['Id', '', 'First name', 'Last name', 'E-mail', ''];
  pagination = { page: 1, per_page: 0, total: 0 };
  loading = false;
  allSubscription = new Subscription();

  constructor(private apiService: ApiService, private modalService: NgbModal, private toastService: ToastService) { }

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
        }
      )
    );
  }

  openAddBrainiacModal(): void {
    const modalRef = this.modalService.open(FormDialogComponent, { centered: true });
    modalRef.componentInstance.title = 'Add new brainiac';
    modalRef.result.then(
      response => {
        this.people.unshift(response);
        this.toastService.successToast('New brainiac created!');
      },
      () => {}
    );
  }
}
