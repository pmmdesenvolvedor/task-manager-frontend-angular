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
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'})
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
