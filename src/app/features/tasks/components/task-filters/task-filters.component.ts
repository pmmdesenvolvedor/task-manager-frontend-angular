import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filters',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="filters-bar">
      <div class="search">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          placeholder="Buscar tarefas..." 
          [value]="search"
          (input)="onSearchChange($event)"
        />
      </div>

      <div class="controls">
        <select [value]="status" (change)="onStatusChange($event)">
          <option value="all">Todos os Status</option>
          <option value="pending">Pendentes</option>
          <option value="done">Concluídas</option>
        </select>

        <select [value]="sortBy" (change)="onSortByChange($event)">
          <option value="createdAt">Data de Criação</option>
          <option value="title">Título</option>
        </select>

        <button class="icon-btn" (click)="onOrderToggle()" [title]="order === 'desc' ? 'Decrescente' : 'Crescente'">
          <svg *ngIf="order === 'desc'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
          <svg *ngIf="order === 'asc'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        </button>

        <div class="view-toggle">
          <button [class.active]="viewMode === 'grid'" (click)="onViewModeChange('grid')" title="Cards">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          </button>
          <button [class.active]="viewMode === 'table'" (click)="onViewModeChange('table')" title="Tabela">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filters-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
      background: var(--color-surface);
      padding: 1rem;
      border-radius: 1rem;
      border: 1px solid var(--color-border);
    }

    .search {
      position: relative;
      flex: 1;
      min-width: 250px;

      svg {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--color-textMuted);
      }

      input {
        width: 100%;
        padding: 0.75rem 1rem 0.75rem 2.5rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        color: var(--color-text);
        font-family: inherit;
        font-size: 0.875rem;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
      }
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;

      select {
        padding: 0.75rem 2.5rem 0.75rem 1rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        color: var(--color-text);
        font-family: inherit;
        font-size: 0.875rem;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23475569%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem top 50%;
        background-size: 0.65rem auto;

        &:focus {
          outline: none;
          border-color: var(--color-primary);
        }
      }
    }

    .icon-btn {
      padding: 0.75rem;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      color: var(--color-textMuted);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;

      &:hover {
        color: var(--color-primary);
        border-color: var(--color-primary);
      }
    }

    .view-toggle {
      display: flex;
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      overflow: hidden;

      button {
        padding: 0.75rem;
        color: var(--color-textMuted);
        transition: all 0.2s;
        border-radius: 0;
        
        &:first-child { border-right: 1px solid var(--color-border); }

        &:hover { color: var(--color-text); }
        &.active {
          background: var(--color-surfaceHover);
          color: var(--color-primary);
        }
      }
    }
  `]
})
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
