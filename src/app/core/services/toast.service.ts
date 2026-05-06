import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  msg: string;
  type: 'success' | 'error';
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  public toasts = signal<ToastMessage[]>([]);
  private nextId = 0;

  show(msg: string, type: 'success' | 'error' = 'success', duration = 3000) {
    const id = this.nextId++;
    const toast: ToastMessage = { msg, type, id };
    
    this.toasts.update(t => [...t, toast]);

    setTimeout(() => {
      this.remove(id);
    }, duration);
  }

  remove(id: number) {
    this.toasts.update(t => t.filter(toast => toast.id !== id));
  }
}
