import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { ToastService } from '../../../core/services/toast.service';
import { TaskFiltersComponent } from '../components/task-filters/task-filters.component';
import { TaskCardComponent } from '../components/task-card/task-card.component';
import { TaskTableComponent } from '../components/task-table/task-table.component';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Task, TaskFilters } from '../../../core/models/task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskFiltersComponent, TaskCardComponent, TaskTableComponent, SkeletonComponent, ButtonComponent],
  template: `
    <div class="tasks-page">
      <app-task-filters
        [search]="filters.search || ''"
        [status]="statusFilter"
        [sortBy]="filters.sortBy || 'createdAt'"
        [order]="filters.order || 'desc'"
        [viewMode]="viewMode"
        (searchChange)="onSearch($event)"
        (statusChange)="onStatus($event)"
        (sortByChange)="onSortBy($event)"
        (orderChange)="onOrder($event)"
        (viewModeChange)="viewMode = $event"
      ></app-task-filters>

      <ng-container *ngIf="!isLoading; else loadingState">
        <!-- GRID VIEW -->
        <div class="tasks-grid" *ngIf="viewMode === 'grid'">
          <app-task-card
            *ngFor="let task of tasks"
            [task]="task"
            (onEdit)="editTask($event)"
            (onDelete)="deleteTask($event)"
          ></app-task-card>
        </div>

        <!-- TABLE VIEW -->
        <div *ngIf="viewMode === 'table'">
          <app-task-table
            [tasks]="tasks"
            (onEdit)="editTask($event)"
            (onDelete)="deleteTask($event)"
          ></app-task-table>
        </div>

        <div class="empty-state" *ngIf="tasks.length === 0">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
          <p>Nenhuma tarefa encontrada.</p>
        </div>

        <div class="pagination" *ngIf="totalPages > 1">
          <app-button 
            variant="secondary" 
            size="sm" 
            [disabled]="!hasPreviousPage"
            (onClick)="changePage(currentPage - 1)"
          >Anterior</app-button>
          
          <span class="page-info">Página {{ currentPage }} de {{ totalPages }}</span>
          
          <app-button 
            variant="secondary" 
            size="sm" 
            [disabled]="!hasNextPage"
            (onClick)="changePage(currentPage + 1)"
          >Próxima</app-button>
        </div>
      </ng-container>

      <ng-template #loadingState>
        <div class="tasks-grid" *ngIf="viewMode === 'grid'">
          <app-skeleton height="180px" borderRadius="1rem" *ngFor="let i of [1,2,3,4,5,6]"></app-skeleton>
        </div>
        <div *ngIf="viewMode === 'table'">
           <app-skeleton height="400px" borderRadius="1rem"></app-skeleton>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .tasks-page {
      display: flex;
      flex-direction: column;
    }

    .tasks-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      background: var(--color-surface);
      border-radius: 1rem;
      border: 1px dashed var(--color-borderLight);
      color: var(--color-textMuted);

      svg {
        margin: 0 auto 1rem;
        opacity: 0.5;
      }

      p { margin: 0; font-size: 0.875rem; }
    }

    .pagination {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 2rem;
      padding: 1rem;
      background: var(--color-surface);
      border-radius: 0.75rem;
      border: 1px solid var(--color-border);
    }

    .page-info {
      font-size: 0.875rem;
      color: var(--color-textSecondary);
      font-weight: 500;
    }
  `]
})
export class TasksListComponent implements OnInit {
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  tasks: Task[] = [];
  isLoading = true;
  viewMode = 'grid';
  statusFilter = 'all';

  filters: TaskFilters = {
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    order: 'desc'
  };

  currentPage = 1;
  totalPages = 1;
  hasNextPage = false;
  hasPreviousPage = false;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasks(this.filters).subscribe({
      next: (res) => {
        this.tasks = res.data;
        this.currentPage = res.meta.page;
        this.totalPages = res.meta.totalPages;
        this.hasNextPage = res.meta.hasNextPage;
        this.hasPreviousPage = res.meta.hasPreviousPage;
        this.isLoading = false;
      },
      error: () => {
        this.toastService.show('Erro ao carregar tarefas.', 'error');
        this.isLoading = false;
      }
    });
  }

  onSearch(search: string) {
    this.filters.search = search;
    this.filters.page = 1;
    this.loadTasks();
  }

  onStatus(status: string) {
    this.statusFilter = status;
    if (status === 'all') delete this.filters.done;
    else this.filters.done = status === 'done';
    this.filters.page = 1;
    this.loadTasks();
  }

  onSortBy(sortBy: string) {
    this.filters.sortBy = sortBy as any;
    this.loadTasks();
  }

  onOrder(order: string) {
    this.filters.order = order as any;
    this.loadTasks();
  }

  changePage(page: number) {
    this.filters.page = page;
    this.loadTasks();
  }

  editTask(task: Task) {
    this.router.navigate(['/tasks', task.id]);
  }

  deleteTask(id: string) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.toastService.show('Tarefa excluída com sucesso.', 'success');
          this.loadTasks();
        },
        error: () => this.toastService.show('Erro ao excluir tarefa.', 'error')
      });
    }
  }
}
