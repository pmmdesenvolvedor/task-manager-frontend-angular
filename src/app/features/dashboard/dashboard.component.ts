import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { TasksBarChartComponent } from './components/tasks-bar-chart/tasks-bar-chart.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { TaskService } from '../../core/services/task.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, TasksBarChartComponent, RecentActivityComponent, SkeletonComponent],
  template: `
    <div class="dashboard-grid" *ngIf="!isLoading; else loadingState">
      
      <div class="stats-grid">
        <app-stats-card 
          title="Total de Tarefas" 
          [value]="totalTasks" 
          description="Aumentou 12% este mês" 
          type="primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </app-stats-card>

        <app-stats-card 
          title="Tarefas Concluídas" 
          [value]="completedTasks" 
          description="Bom trabalho!" 
          type="success"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </app-stats-card>

        <app-stats-card 
          title="Taxa de Conclusão" 
          [value]="completionRate + '%'" 
          description="Sua eficiência" 
          type="warning"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </app-stats-card>
      </div>

      <div class="charts-grid">
        <div class="chart-wrapper">
          <app-tasks-bar-chart [data]="chartData"></app-tasks-bar-chart>
        </div>
        <div class="activity-wrapper">
          <app-recent-activity [activities]="recentActivity"></app-recent-activity>
        </div>
      </div>

    </div>

    <ng-template #loadingState>
      <div class="dashboard-grid">
        <div class="stats-grid">
          <app-skeleton height="120px" borderRadius="1rem" *ngFor="let i of [1,2,3]"></app-skeleton>
        </div>
        <div class="charts-grid">
          <app-skeleton height="350px" borderRadius="1rem"></app-skeleton>
          <app-skeleton height="350px" borderRadius="1rem"></app-skeleton>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    .dashboard-grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1.5rem;

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);

  isLoading = true;
  totalTasks = 0;
  completedTasks = 0;
  completionRate = 0;

  chartData: { name: string; tarefas: number }[] = [];
  recentActivity: { description: string; time: string; type: string }[] = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    // In a real app, you might have a specific /dashboard endpoint.
    // For now, let's fetch first page to calculate some fake stats just like the React app
    this.taskService.getTasks({ limit: 50 }).subscribe({
      next: (res) => {
        const tasks = res.data;
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(t => t.done).length;
        this.completionRate = this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100) : 0;

        // Mock chart data
        this.chartData = [
          { name: 'Seg', tarefas: 2 },
          { name: 'Ter', tarefas: 5 },
          { name: 'Qua', tarefas: 3 },
          { name: 'Qui', tarefas: 7 },
          { name: 'Sex', tarefas: 4 },
          { name: 'Sáb', tarefas: 1 },
          { name: 'Dom', tarefas: 0 }
        ];

        // Mock recent activity based on tasks
        this.recentActivity = tasks.slice(0, 4).map(t => ({
          description: t.done ? `Você completou "${t.title}"` : `Criou "${t.title}"`,
          time: new Date(t.updatedAt).toLocaleDateString(),
          type: t.done ? 'complete' : 'create'
        }));

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
