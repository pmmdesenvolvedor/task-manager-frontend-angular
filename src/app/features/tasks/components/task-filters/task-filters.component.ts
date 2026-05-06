import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-filters.component.html',
  styleUrl: './task-filters.component.scss'})
export class TaskFiltersComponent {
  @Input() search = '';
  @Input() status = 'all';
  @Input() sortBy = 'createdAt';
  @Input() order = 'desc';
  @Input() viewMode = 'grid';

  @Output() searchChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() sortByChange = new EventEmitter<string>();
  @Output() orderChange = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<string>();

  private timeout: any;

  onSearchChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.searchChange.emit(val);
    }, 500);
  }

  onStatusChange(event: Event) {
    this.statusChange.emit((event.target as HTMLSelectElement).value);
  }

  onSortByChange(event: Event) {
    this.sortByChange.emit((event.target as HTMLSelectElement).value);
  }

  onOrderToggle() {
    this.orderChange.emit(this.order === 'desc' ? 'asc' : 'desc');
  }

  onViewModeChange(mode: string) {
    this.viewModeChange.emit(mode);
  }
}
