import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { SmartGuy } from '../../../modules/board/interfaces/smart-guy';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: [ './table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  @Input() data: SmartGuy[];
  @Input() columns: string[] = [];
  @Input() pagination: { page: number, per_page: number, total: number };
  @Input() loading = false;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() guyRemoved = new EventEmitter<number>();
  @Output() guyEdited = new EventEmitter<SmartGuy>();

  handleEdition(editedGuyData: SmartGuy): void {
    this.guyEdited.emit(editedGuyData);
  }

  handleRemoval(id: number): void {
    this.guyRemoved.emit(id);
  }

  pageChange() {
    this.pageChanged.emit(this.pagination.page);
  }

}
