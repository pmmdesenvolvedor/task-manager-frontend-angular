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
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'})
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
