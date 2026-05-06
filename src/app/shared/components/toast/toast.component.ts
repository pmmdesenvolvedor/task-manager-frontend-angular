import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div 
        *ngFor="let toast of toastService.toasts()" 
        class="toast"
        [ngClass]="toast.type"
      >
        <span class="icon">
          <svg *ngIf="toast.type === 'success'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <svg *ngIf="toast.type === 'error'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        </span>
        <span class="msg">{{ toast.msg }}</span>
        <button class="close-btn" (click)="toastService.remove(toast.id)">&times;</button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      z-index: 9999;
    }

    .toast {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-radius: 0.75rem;
      background: var(--color-surfaceElevated);
      color: var(--color-text);
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--color-border);
      min-width: 300px;
      animation: slideIn 0.3s ease forwards;
    }

    .success .icon { color: var(--color-success); }
    .error .icon { color: var(--color-danger); }

    .msg {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 500;
    }

    .close-btn {
      color: var(--color-textMuted);
      font-size: 1.25rem;
      line-height: 1;
      &:hover { color: var(--color-text); }
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);
}
