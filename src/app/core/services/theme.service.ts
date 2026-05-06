import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public themeMode = signal<ThemeMode>('dark');

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('@TaskManager:theme') as ThemeMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        this.themeMode.set(savedTheme);
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        this.themeMode.set('light');
      } else {
        this.themeMode.set('dark');
      }
      this.applyTheme(this.themeMode());
    }
  }

  toggleTheme() {
    const newTheme = this.themeMode() === 'light' ? 'dark' : 'light';
    this.themeMode.set(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('@TaskManager:theme', newTheme);
      this.applyTheme(newTheme);
    }
  }

  private applyTheme(theme: ThemeMode) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
