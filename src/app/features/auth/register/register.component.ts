import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, InputComponent],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="header">
          <div class="logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5c-1.1 0-2 .9-2 2v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <h1>Criar Conta</h1>
          <p>Junte-se ao TaskManager hoje mesmo</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <app-input
            id="email"
            type="email"
            label="E-mail"
            placeholder="seu@email.com"
            formControlName="email"
            [error]="getErrorMessage('email')"
            [hasIcon]="true"
          >
            <svg icon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </app-input>

          <app-input
            id="password"
            type="password"
            label="Senha"
            placeholder="••••••••"
            formControlName="password"
            [error]="getErrorMessage('password')"
            [hasIcon]="true"
          >
            <svg icon width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </app-input>

          <app-button type="submit" [loading]="isLoading" class="submit-btn">
            Registrar
          </app-button>
        </form>

        <p class="footer-text">
          Já tem uma conta? <a routerLink="/login">Faça Login</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: var(--color-bg);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: -10%; left: -10%;
        width: 40vw; height: 40vw;
        border-radius: 50%;
        background: var(--color-primary);
        filter: blur(100px);
        opacity: 0.1;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -10%; right: -10%;
        width: 40vw; height: 40vw;
        border-radius: 50%;
        background: var(--color-accent);
        filter: blur(100px);
        opacity: 0.05;
      }
    }

    .auth-card {
      width: 100%;
      max-width: 420px;
      background: var(--color-surface);
      padding: 2.5rem;
      border-radius: 1.5rem;
      border: 1px solid var(--color-borderLight);
      box-shadow: var(--shadow-xl);
      position: relative;
      z-index: 1;

      form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
    }

    .header {
      text-align: center;
      margin-bottom: 2rem;

      .logo {
        width: 48px; height: 48px;
        margin: 0 auto 1rem;
        background: var(--gradient-primary);
        border-radius: 1rem;
        display: flex; align-items: center; justify-content: center;
        color: white;
        box-shadow: var(--shadow-glow);
      }

      h1 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text);
        margin: 0 0 0.5rem;
      }

      p {
        color: var(--color-textMuted);
        font-size: 0.875rem;
        margin: 0;
      }
    }

    .submit-btn {
      width: 100%;
      margin-top: 1rem;
      ::ng-deep button { width: 100%; }
    }

    .footer-text {
      text-align: center;
      margin-top: 2rem;
      font-size: 0.875rem;
      color: var(--color-textSecondary);

      a {
        color: var(--color-primary);
        font-weight: 600;
        &:hover { text-decoration: underline; }
      }
    }
  `]
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isLoading = false;

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'Este campo é obrigatório.';
      if (control.errors?.['email']) return 'E-mail inválido.';
      if (control.errors?.['minlength']) return 'A senha deve ter no mínimo 6 caracteres.';
    }
    return '';
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.getRawValue()).subscribe({
        next: () => {
          this.toastService.show('Conta criada! Fazendo login...', 'success');
          this.authService.login(this.registerForm.getRawValue()).subscribe({
            next: () => this.router.navigate(['/dashboard'])
          });
        },
        error: () => {
          this.toastService.show('Ocorreu um erro ao criar a conta.', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
