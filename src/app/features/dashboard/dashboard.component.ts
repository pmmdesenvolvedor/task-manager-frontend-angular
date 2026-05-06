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

        // Dados reais para o gráfico (Tarefas concluídas nos últimos 7 dias)
        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const d = new Date();
          d.setDate(d.getDate() - (6 - i));
          return {
            dateStr: d.toISOString().split('T')[0],
            name: days[d.getDay()],
            tarefas: 0
          };
        });

        tasks.forEach(t => {
          if (t.done && t.createdAt) {
             const taskDateStr = new Date(t.createdAt).toISOString().split('T')[0];
             const dayObj = last7Days.find(d => d.dateStr === taskDateStr);
             if (dayObj) {
               dayObj.tarefas++;
             }
          }
        });

        this.chartData = last7Days.map(d => ({ name: d.name, tarefas: d.tarefas }));

        // Atividade recente baseada nas tarefas reais
        this.recentActivity = tasks.slice(0, 4).map(t => ({
          description: t.done ? `Tarefa concluída: "${t.title}"` : `Tarefa criada: "${t.title}"`,
          time: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'Data desconhecida',
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
