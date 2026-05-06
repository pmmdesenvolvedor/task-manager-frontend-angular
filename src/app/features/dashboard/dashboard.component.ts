import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { TasksBarChartComponent } from './components/tasks-bar-chart/tasks-bar-chart.component';
import { TasksLineChartComponent } from './components/tasks-line-chart/tasks-line-chart.component';
import { RecentActivityComponent } from './components/recent-activity/recent-activity.component';
import { TaskService } from '../../core/services/task.service';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatsCardComponent, TasksBarChartComponent, TasksLineChartComponent, RecentActivityComponent, SkeletonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);

  isLoading = true;
  totalTasks = 0;
  completedTasks = 0;
  pendingTasks = 0;
  completionRate = 0;

  chartData: { name: string; tarefas: number }[] = [];
  recentActivity: { description: string; time: string; type: string }[] = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.taskService.getTasks({ limit: 50 }).subscribe({
      next: (res) => {
        const tasks = res.data;
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(t => t.done).length;
        this.pendingTasks = this.totalTasks - this.completedTasks;
        this.completionRate = this.totalTasks > 0 ? Math.round((this.completedTasks / this.totalTasks) * 100) : 0;

        // Line Chart Data (Tarefas criadas nos últimos 7 dias)
        const days = ['dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.'];
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
          if (t.createdAt) {
             const taskDateStr = new Date(t.createdAt).toISOString().split('T')[0];
             const dayObj = last7Days.find(d => d.dateStr === taskDateStr);
             if (dayObj) {
               dayObj.tarefas++;
             }
          }
        });

        this.chartData = last7Days.map(d => ({ name: d.name, tarefas: d.tarefas }));

        // Atividade recente baseada nas tarefas reais
        this.recentActivity = tasks.slice(0, 5).map(t => {
          // Relative time fake calculation for "há X min" (since we don't have a real library installed)
          const diffMinutes = t.createdAt ? Math.floor((new Date().getTime() - new Date(t.createdAt).getTime()) / 60000) : 0;
          let timeStr = '';
          if (diffMinutes < 60) timeStr = `${diffMinutes} min`;
          else if (diffMinutes < 1440) timeStr = `${Math.floor(diffMinutes / 60)}h`;
          else timeStr = `${Math.floor(diffMinutes / 1440)} dias`;
          
          return {
            description: t.title,
            time: timeStr,
            type: t.done ? 'complete' : 'create'
          };
        });

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
