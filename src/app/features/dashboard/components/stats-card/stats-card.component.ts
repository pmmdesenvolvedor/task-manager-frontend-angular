import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'})
export class StatsCardComponent {
  @Input() title = '';
  @Input() value: number | string = 0;
  @Input() description = '';
  @Input() subtitle = '';
  @Input() type: 'primary' | 'success' | 'warning' | 'info' | 'danger' = 'primary';
  @Input() active = false;
}
