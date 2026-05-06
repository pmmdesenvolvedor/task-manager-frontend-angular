import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="input-wrapper" [class.has-error]="error">
      <label *ngIf="label" [for]="id">{{ label }}</label>
      <div class="input-container">
        <span class="icon-left" *ngIf="hasIcon">
          <ng-content select="[icon]"></ng-content>
        </span>
        <input
          *ngIf="type !== 'textarea'"
          [type]="type"
          [id]="id"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          [class.with-icon]="hasIcon"
        />
        <textarea
          *ngIf="type === 'textarea'"
          [id]="id"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [value]="value"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
          [class.with-icon]="hasIcon"
          rows="4"
        ></textarea>
      </div>
      <span class="error-msg" *ngIf="error">{{ error }}</span>
    </div>
  `,
  styles: [`
    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      width: 100%;
    }

    label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-textSecondary);
    }

    .input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .icon-left {
      position: absolute;
      left: 1rem;
      color: var(--color-textMuted);
      display: flex;
      align-items: center;
    }

    input, textarea {
      width: 100%;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 0.625rem;
      padding: 0.875rem 1rem;
      color: var(--color-text);
      font-size: 0.875rem;
      transition: all 0.2s ease;
      font-family: inherit;

      &::placeholder {
        color: var(--color-textMuted);
      }

      &:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 1px var(--color-primary);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .with-icon {
      padding-left: 2.75rem;
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    .has-error input, .has-error textarea {
      border-color: var(--color-danger);
    }

    .error-msg {
      color: var(--color-danger);
      font-size: 0.75rem;
      margin-top: 0.25rem;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = '';
  @Input() label = '';
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() error = '';
  @Input() disabled = false;
  @Input() hasIcon = false;

  value = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  onInputChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value = val;
    this.onChange(val);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
