import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../../../core/models/task.model';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, BadgeComponent, DatePipe],
  template: `
    <div class="table-container">
      <table class="task-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Criado em</th>
            <th class="actions-th">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let task of tasks" (click)="onEdit.emit(task)">
            <td>
              <app-badge [variant]="task.done ? 'success' : 'warning'" [dot]="true">
                {{ task.done ? 'Concluída' : 'Pendente' }}
              </app-badge>
            </td>
            <td class="font-medium">{{ task.title }}</td>
            <td class="text-muted truncate">{{ task.description || '-' }}</td>
            <td class="text-muted">{{ task.createdAt | date:'dd/MM/yyyy' }}</td>
            <td class="actions-cell" (click)="$event.stopPropagation()">
              <button class="action-btn text-danger" (click)="onDelete.emit(task.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              </button>
            </td>
          </tr>
          <tr *ngIf="tasks.length === 0">
            <td colspan="5" class="empty-state">Nenhuma tarefa encontrada.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-container {
      width: 100%;
      overflow-x: auto;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 1rem;
    }

    .task-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;

      th, td {
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--color-borderLight);
        font-size: 0.875rem;
        white-space: nowrap;
      }

      th {
        font-weight: 600;
        color: var(--color-textSecondary);
        background: var(--color-surfaceElevated);
      }

      tbody tr {
        transition: all 0.2s ease;
        cursor: pointer;

        &:hover {
          background: var(--color-surfaceHover);
        }

        &:last-child td { border-bottom: none; }
      }

      .actions-th { text-align: right; }
      .actions-cell { text-align: right; }
    }

    .font-medium { font-weight: 500; color: var(--color-text); }
    .text-muted { color: var(--color-textMuted); }
    
    .truncate {
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .action-btn {
      padding: 0.375rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: var(--color-dangerBg);
        color: var(--color-danger);
      }

      &.text-danger { color: var(--color-textMuted); }
      &:hover.text-danger { color: var(--color-danger); }
    }

    .empty-state {
      text-align: center;
      padding: 3rem !important;
      color: var(--color-textMuted);
    }
  `]
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
}
