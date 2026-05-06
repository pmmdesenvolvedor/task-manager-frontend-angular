import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../../../core/models/task.model';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent, DatePipe],
  template: `
    <div class="task-card" (click)="onEdit.emit(task)">
      <div class="header">
        <h3 class="title">{{ task.title }}</h3>
        <app-badge [variant]="task.done ? 'success' : 'warning'" [dot]="true">
          {{ task.done ? 'Concluída' : 'Pendente' }}
        </app-badge>
      </div>
      
      <p class="description">{{ task.description || 'Sem descrição' }}</p>
      
      <div class="footer">
        <span class="date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          {{ task.createdAt | date:'dd/MM/yyyy' }}
        </span>
        
        <div class="actions" (click)="$event.stopPropagation()">
          <button class="action-btn text-danger" (click)="onDelete.emit(task.id)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .task-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 1rem;
      padding: 1.5rem;
      transition: all 0.25s ease;
      cursor: pointer;

      &:hover {
        transform: translateY(-4px);
        border-color: var(--color-primary);
        box-shadow: 0 4px 20px var(--color-primaryGlow);
      }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 1.125rem;
      font-weight: 600;
      color: var(--color-text);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .description {
      font-size: 0.875rem;
      color: var(--color-textSecondary);
      margin: 0 0 1.5rem;
      line-height: 1.6;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--color-borderLight);
    }

    .date {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      color: var(--color-textMuted);
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      padding: 0.375rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background: var(--color-dangerBg);
        color: var(--color-danger);
      }

      &.text-danger { color: var(--color-danger); }
    }
  `]
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
}
