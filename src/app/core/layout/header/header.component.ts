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
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'})
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
