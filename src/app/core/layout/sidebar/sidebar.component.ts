import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span class="logo-text">Task<span>Apex</span></span>
      </div>

      <nav class="nav">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="9"></rect>
            <rect x="14" y="3" width="7" height="5"></rect>
            <rect x="14" y="12" width="7" height="9"></rect>
            <rect x="3" y="16" width="7" height="5"></rect>
          </svg>
          Dashboard
        </a>
        <a routerLink="/tasks" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Tarefas
        </a>
      </nav>

      <div class="user-profile">
        <div class="avatar">
          {{ userInitials }}
        </div>
        <div class="user-info">
          <p class="name">Conectado</p>
          <p class="email">{{ userEmail }}</p>
        </div>
        <button class="logout-btn" (click)="logout()" title="Sair">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: var(--color-surface);
      border-right: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 50;
    }

    .logo {
      height: 80px;
      display: flex;
      align-items: center;
      padding: 0 1.5rem;
      gap: 1rem;
    }

    .logo-icon {
      width: 40px;
      height: 40px;
      border-radius: 0.75rem;
      background: var(--gradient-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: var(--shadow-glow);
    }

    .logo-text {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--color-text);
      letter-spacing: -0.5px;
      span { color: var(--color-primary); }
    }

    .nav {
      flex: 1;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.875rem 1rem;
      border-radius: 0.625rem;
      color: var(--color-textMuted);
      font-weight: 500;
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-surfaceHover);
        color: var(--color-text);
      }

      &.active {
        background: var(--color-primaryGlow);
        color: var(--color-primary);
        border: 1px solid rgba(108, 99, 255, 0.2);
        box-shadow: inset 0 0 20px rgba(108, 99, 255, 0.05);
      }
    }

    .user-profile {
      padding: 1.5rem;
      border-top: 1px solid var(--color-border);
      display: flex;
      align-items: center;
      gap: 1rem;
      background: var(--color-bg);
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-surfaceHover);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: var(--color-primary);
      border: 1px solid var(--color-borderLight);
    }

    .user-info {
      flex: 1;
      min-width: 0;
      .name {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--color-text);
        margin: 0;
      }
      .email {
        font-size: 0.75rem;
        color: var(--color-textSecondary);
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .logout-btn {
      color: var(--color-textMuted);
      padding: 0.5rem;
      border-radius: 0.375rem;
      transition: all 0.2s;
      &:hover {
        background: var(--color-dangerBg);
        color: var(--color-danger);
      }
    }
  `]
})
export class SidebarComponent {
  private authService = inject(AuthService);

  get userInitials() {
    const email = this.authService.currentUser()?.email || 'U';
    return email.substring(0, 2).toUpperCase();
  }

  get userEmail() {
    return this.authService.currentUser()?.email || '';
  }

  logout() {
    this.authService.logout();
  }
}
