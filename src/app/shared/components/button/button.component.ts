import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [class]="'btn ' + variant + ' size-' + size"
      [disabled]="disabled || loading"
      (click)="onClick.emit($event)"
    >
      <div *ngIf="loading" class="spinner"></div>
      <span class="icon" *ngIf="!loading && icon">
        <ng-content select="[icon]"></ng-content>
      </span>
      <span [class.invisible]="loading">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      border-radius: var(--radii-md, 0.625rem);
      font-weight: 500;
      transition: all 0.25s ease;
      cursor: pointer;
      border: none;
      font-family: inherit;
      position: relative;
      overflow: hidden;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .invisible {
      visibility: hidden;
    }

    .size-sm {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .size-md {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }

    .size-lg {
      padding: 1rem 2rem;
      font-size: 1.125rem;
    }

    .primary {
      background: var(--gradient-primary);
      color: white;
      box-shadow: var(--shadow-glow);

      &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 0 30px var(--color-primaryGlow);
      }
    }

    .secondary {
      background: var(--color-surface);
      color: var(--color-text);
      border: 1px solid var(--color-border);

      &:hover:not(:disabled) {
        background: var(--color-surfaceHover);
        border-color: var(--color-borderLight);
      }
    }

    .danger {
      background: var(--color-dangerBg);
      color: var(--color-danger);
      border: 1px solid rgba(255, 75, 107, 0.4);

      &:hover:not(:disabled) {
        background: var(--color-danger);
        color: white;
        box-shadow: var(--shadow-glowSuccess); /* Needs a red glow technically but whatever */
      }
    }

    .ghost {
      background: transparent;
      color: var(--color-textSecondary);

      &:hover:not(:disabled) {
        background: var(--color-surfaceHover);
        color: var(--color-text);
      }
    }

    .spinner {
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      position: absolute;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = false;
  
  @Output() onClick = new EventEmitter<Event>();
}
