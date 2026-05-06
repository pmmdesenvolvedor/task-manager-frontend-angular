import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: 'register', 
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) 
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'tasks', 
        loadComponent: () => import('./features/tasks/tasks-list/tasks-list.component').then(m => m.TasksListComponent) 
      },
      { 
        path: 'tasks/new', 
        loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) 
      },
      { 
        path: 'tasks/:id', 
        loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) 
      }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
