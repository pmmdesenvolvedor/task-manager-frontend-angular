import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-card">
      <h3>Atividade Recente</h3>
      <div class="timeline">
        <div class="timeline-item" *ngFor="let item of activities; let last = last">
          <div class="timeline-dot" [ngClass]="item.type"></div>
          <div class="timeline-content">
            <p class="desc">{{ item.description }}</p>
            <p class="time">{{ item.time }}</p>
          </div>
          <div class="timeline-line" *ngIf="!last"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .activity-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 1rem;
      padding: 1.5rem;
      height: 100%;
      box-shadow: var(--shadow-sm);

      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 1.5rem;
        color: var(--color-text);
      }
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .timeline-item {
      display: flex;
      gap: 1rem;
      position: relative;
    }

    .timeline-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-top: 4px;
      z-index: 2;

      &.create { background: var(--color-primary); box-shadow: 0 0 8px var(--color-primaryGlow); }
      &.complete { background: var(--color-success); box-shadow: 0 0 8px var(--color-successBg); }
      &.update { background: var(--color-warning); box-shadow: 0 0 8px var(--color-warningBg); }
      &.delete { background: var(--color-danger); box-shadow: 0 0 8px var(--color-dangerBg); }
    }

    .timeline-line {
      position: absolute;
      top: 16px;
      left: 5px;
      bottom: -24px;
      width: 2px;
      background: var(--color-border);
      z-index: 1;
    }

    .timeline-content {
      flex: 1;
      .desc {
        font-size: 0.875rem;
        color: var(--color-text);
        margin: 0 0 0.25rem;
      }
      .time {
        font-size: 0.75rem;
        color: var(--color-textMuted);
        margin: 0;
      }
    }
  `]
})
export class RecentActivityComponent {
  @Input() activities: { description: string; time: string; type: string }[] = [];
}
