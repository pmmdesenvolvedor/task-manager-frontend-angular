import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'})
export class BadgeComponent {
  @Input() variant: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
  @Input() dot = false;
}
