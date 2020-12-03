import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SmartGuy } from '../../../modules/board/interfaces/smart-guy';
import { ToastService } from 'src/app/modules/board/services/toast.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() data: SmartGuy[];
  @Input() columns: string[] = [];
  @Input() pagination: { page: number, per_page: number, total: number };
  @Input() loading = false;
  @Output() pageChanged = new EventEmitter<number>();

  constructor(private toastService: ToastService) { }

  handleEdition(editedGuyData: SmartGuy): void {
    const editedGuy = this.data.find(guy => guy.id === editedGuyData.id);
    /* Kwestia niespójności nazw w response z API (first_name, firstName) */
    editedGuy.first_name = editedGuyData.first_name;
    editedGuy.last_name = editedGuyData.last_name;
    editedGuy.email = editedGuyData.email;
    this.toastService.successToast('Brainiac updated!');

  }

  handleRemoval(id: number): void {
    this.data = this.data.filter(guy => guy.id !== id);
    this.toastService.successToast('Brainiac removed!');
  }

  pageChange(): void {
    this.pageChanged.emit(this.pagination.page);
  }

}
