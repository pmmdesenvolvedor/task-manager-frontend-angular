import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <header class="header">
      <div class="left">
        <h1>{{ title }}</h1>
        <p>TaskManager / {{ title }}</p>
      </div>
      <div class="right">
        <button class="icon-btn" (click)="themeService.toggleTheme()" aria-label="Alternar tema">
          <svg *ngIf="themeService.themeMode() === 'dark'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
          <svg *ngIf="themeService.themeMode() === 'light'" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <span class="glow-dot">API Online</span>
        
        <app-button *ngIf="currentPath !== '/tasks/new'" size="sm" (onClick)="goToNewTask()">
          <span icon>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </span>
          Nova Tarefa
        </app-button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 64px;
      background: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem;
      position: sticky;
      top: 0;
      z-index: 40;
      backdrop-filter: blur(8px);
      background-color: color-mix(in srgb, var(--color-surface) 90%, transparent);
    }

    .left {
      display: flex;
      flex-direction: column;

      h1 {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text);
        line-height: 1;
        margin: 0;
      }

      p {
        font-size: 0.75rem;
        color: var(--color-textMuted);
        margin: 0.125rem 0 0 0;
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .icon-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--color-surfaceHover);
      color: var(--color-textSecondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s ease;
      border: 1px solid var(--color-borderLight);

      &:hover {
        color: var(--color-primary);
        background: var(--color-primaryGlow);
        border-color: rgba(108, 99, 255, 0.4);
        transform: scale(1.05);
      }
    }

    .glow-dot {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      color: var(--color-success);
      background: var(--color-successBg);
      padding: 0.25rem 0.625rem;
      border-radius: 9999px;
      border: 1px solid rgba(0, 229, 160, 0.3);

      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--color-success);
        box-shadow: 0 0 8px var(--color-success);
        animation: pulse 2s infinite;
      }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `]
})
export class HeaderComponent {
  public themeService = inject(ThemeService);
  public authService = inject(AuthService);
  private router = inject(Router);

  title = 'Dashboard';
  currentPath = '';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.urlAfterRedirects;
      this.updateTitle();
    });
  }

  updateTitle() {
    if (this.currentPath.includes('/dashboard')) this.title = 'Dashboard';
    else if (this.currentPath === '/tasks') this.title = 'Minhas Tarefas';
    else if (this.currentPath === '/tasks/new') this.title = 'Nova Tarefa';
    else if (this.currentPath.includes('/tasks/')) this.title = 'Editar Tarefa';
  }

  goToNewTask() {
    this.router.navigate(['/tasks/new']);
  }
}
