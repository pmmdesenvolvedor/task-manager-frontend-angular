import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { ToastService } from '../../../core/services/toast.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  template: `
    <div class="form-wrapper">
      <div class="header">
        <div class="back-btn" (click)="goBack()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </div>
        <h2>{{ isEditMode ? 'Editar Tarefa' : 'Nova Tarefa' }}</h2>
      </div>

      <div class="form-card">
        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
          
          <app-input
            id="title"
            label="Título da Tarefa"
            placeholder="Ex: Reunião de Planejamento"
            formControlName="title"
            [error]="getErrorMessage('title')"
          ></app-input>

          <app-input
            id="description"
            type="textarea"
            label="Descrição (Opcional)"
            placeholder="Detalhes da tarefa..."
            formControlName="description"
          ></app-input>

          <div class="checkbox-wrapper" *ngIf="isEditMode">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="done" />
              <span class="custom-checkbox">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
              Marcar como concluída
            </label>
          </div>

          <div class="actions">
            <app-button variant="ghost" type="button" (onClick)="goBack()">
              Cancelar
            </app-button>
            <app-button type="submit" [loading]="isLoading">
              {{ isEditMode ? 'Salvar Alterações' : 'Criar Tarefa' }}
            </app-button>
          </div>

        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-wrapper {
      max-width: 600px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;

      h2 {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--color-text);
        margin: 0;
      }
    }

    .back-btn {
      width: 40px; height: 40px;
      border-radius: 0.75rem;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      display: flex; align-items: center; justify-content: center;
      color: var(--color-textSecondary);
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: var(--color-surfaceHover);
        color: var(--color-text);
      }
    }

    .form-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 1.5rem;
      padding: 2.5rem;
      box-shadow: var(--shadow-md);

      form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    }

    .checkbox-wrapper {
      margin-top: 0.5rem;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--color-text);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;

      input {
        display: none;

        &:checked + .custom-checkbox {
          background: var(--color-success);
          border-color: var(--color-success);
          
          svg { opacity: 1; transform: scale(1); }
        }
      }
    }

    .custom-checkbox {
      width: 20px; height: 20px;
      border-radius: 0.375rem;
      border: 2px solid var(--color-borderLight);
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;
      background: var(--color-bg);

      svg {
        color: white;
        opacity: 0;
        transform: scale(0.5);
        transition: all 0.2s;
      }
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--color-borderLight);
    }
  `]
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  taskId: string | null = null;
  isEditMode = false;
  isLoading = false;

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required]],
    description: [''],
    done: [false]
  });

  ngOnInit() {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    this.taskService.getTask(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description || '',
          done: task.done
        });
      },
      error: () => {
        this.toastService.show('Erro ao carregar tarefa', 'error');
        this.goBack();
      }
    });
  }

  getErrorMessage(field: string): string {
    const control = this.taskForm.get(field);
    if (control?.touched && control?.invalid && control.errors?.['required']) {
      return 'Este campo é obrigatório.';
    }
    return '';
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.isLoading = true;
      const data = this.taskForm.getRawValue();

      const request = this.isEditMode 
        ? this.taskService.updateTask(this.taskId!, data)
        : this.taskService.createTask({ title: data.title, description: data.description });

      request.subscribe({
        next: () => {
          this.toastService.show(`Tarefa ${this.isEditMode ? 'atualizada' : 'criada'} com sucesso!`, 'success');
          this.goBack();
        },
        error: () => {
          this.toastService.show('Ocorreu um erro.', 'error');
          this.isLoading = false;
        }
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  goBack() {
    this.router.navigate(['/tasks']);
  }
}
