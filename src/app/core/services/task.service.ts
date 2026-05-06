import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task, TaskFilters, PaginatedResponse, CreateTaskInput, UpdateTaskInput } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasks(filters: TaskFilters): Observable<PaginatedResponse<Task>> {
    let params = new HttpParams();
    if (filters.page) params = params.set('page', filters.page.toString());
    if (filters.limit) params = params.set('limit', filters.limit.toString());
    if (filters.done !== undefined) params = params.set('done', filters.done.toString());
    if (filters.search) params = params.set('search', filters.search);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.order) params = params.set('order', filters.order);

    return this.http.get<PaginatedResponse<Task>>(`${this.apiUrl}/tasks`, { params });
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  createTask(data: CreateTaskInput): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, data);
  }

  updateTask(id: string, data: UpdateTaskInput): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, data);
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
