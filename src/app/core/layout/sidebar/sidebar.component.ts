import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private authService = inject(AuthService);

  get userInitials() {
    const email = this.authService.currentUser()?.email || 'U';
    return email.charAt(0).toUpperCase() ?? 'U';
  }

  get userEmail() {
    return this.authService.currentUser()?.email || '';
  }

  logout() {
    this.authService.logout();
  }
}
