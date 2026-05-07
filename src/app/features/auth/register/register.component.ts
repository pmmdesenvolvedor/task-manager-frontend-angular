import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { passwordMatchValidator } from './register.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  isLoading = false;

  registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, Validators.minLength(6), passwordMatchValidator],
    ],
  });

  constructor() {
    // Revalidar confirmPassword quando password muda
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.touched && control?.invalid) {
      if (control.errors?.['required']) return 'Este campo é obrigatório.';
      if (control.errors?.['email']) return 'E-mail inválido.';
      if (control.errors?.['minlength'])
        return 'A senha deve ter no mínimo 6 caracteres.';
      if (control.errors?.['passwordMismatch'])
        return 'As senhas não coincidem.';
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
            next: () => this.router.navigate(['/dashboard']),
          });
        },
        error: () => {
          this.toastService.show('Ocorreu um erro ao criar a conta.', 'error');
          this.isLoading = false;
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
