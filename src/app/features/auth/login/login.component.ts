import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isLoading = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'Este campo é obrigatório.';
      if (control.errors?.['email']) return 'E-mail inválido.';
      if (control.errors?.['minlength']) return 'A senha deve ter no mínimo 6 caracteres.';
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: () => {
          this.toastService.show('Login realizado com sucesso!', 'success');
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.toastService.show('Credenciais inválidas ou erro no servidor.', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
