import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../../../core/models/task.model';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule, BadgeComponent, DatePipe],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
}
