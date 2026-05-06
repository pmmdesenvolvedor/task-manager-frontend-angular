import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../../../core/models/task.model';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, BadgeComponent, DatePipe, ButtonComponent],
  templateUrl: './task-table.component.html',
  styleUrl: './task-table.component.scss'
})
export class TaskTableComponent {
  @Input() tasks: Task[] = [];
  @Input() isDeleting = false;
  @Input() isToggling = false;
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onToggle = new EventEmitter<{id: string, done: boolean}>();
}
