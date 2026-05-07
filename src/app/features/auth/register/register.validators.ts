import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.parent?.get('password');
  const confirmPassword = control.value;

  // Se o campo password não existir ainda ou estiverem iguais, está tudo ok
  if (!password || password.value === confirmPassword) {
    return null;
  }

  // Se forem diferentes, retorna o objeto de erro
  return { passwordMismatch: true };
};
