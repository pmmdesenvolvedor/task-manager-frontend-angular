import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class.full-page]="fullPage" [class.wrapper]="!fullPage">
      <div class="spinner" [style.width.px]="size" [style.height.px]="size"></div>
    </div>
  `,
  styles: [`
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }

    .full-page {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--color-bg);
      z-index: 50;
    }

    .spinner {
      border: 3px solid var(--color-surfaceHover);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class SpinnerComponent {
  @Input() size = 40;
  @Input() fullPage = false;
}
