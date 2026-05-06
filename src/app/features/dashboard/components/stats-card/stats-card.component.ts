import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="header">
        <h3 class="title">{{ title }}</h3>
        <span class="icon-wrapper" [ngClass]="type">
          <ng-content></ng-content>
        </span>
      </div>
      <div class="content">
        <p class="value">{{ value }}</p>
        <p class="description">{{ description }}</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 1rem;
      padding: 1.5rem;
      transition: all 0.25s ease;
      box-shadow: var(--shadow-sm);

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: var(--color-borderLight);
      }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .title {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-textSecondary);
      margin: 0;
    }

    .icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.primary {
        background: rgba(108, 99, 255, 0.1);
        color: var(--color-primary);
      }
      &.success {
        background: var(--color-successBg);
        color: var(--color-success);
      }
      &.warning {
        background: var(--color-warningBg);
        color: var(--color-warning);
      }
      &.danger {
        background: var(--color-dangerBg);
        color: var(--color-danger);
      }
    }

    .value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1.2;
      margin: 0;
    }

    .description {
      font-size: 0.75rem;
      color: var(--color-textMuted);
      margin: 0.25rem 0 0 0;
    }
  `]
})
export class StatsCardComponent {
  @Input() title = '';
  @Input() value: number | string = 0;
  @Input() description = '';
  @Input() type: 'primary' | 'success' | 'warning' | 'danger' = 'primary';
}
