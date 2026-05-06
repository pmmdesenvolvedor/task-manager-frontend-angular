import { Component, ElementRef, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-tasks-bar-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-card">
      <h3>Tarefas Concluídas (Últimos 7 dias)</h3>
      <div class="chart-container">
        <canvas #chartCanvas></canvas>
      </div>
    </div>
  `,
  styles: [`
    .chart-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: 1rem;
      padding: 1.5rem;
      height: 100%;
      box-shadow: var(--shadow-sm);

      h3 {
        font-size: 1rem;
        font-weight: 600;
        margin: 0 0 1.5rem;
        color: var(--color-text);
      }
    }

    .chart-container {
      height: 300px;
      width: 100%;
    }
  `]
})
export class TasksBarChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() data: { name: string; tarefas: number }[] = [];
  
  private chart: Chart | null = null;

  ngAfterViewInit() {
    this.createChart();
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  private createChart() {
    if (!this.chartCanvas) return;

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    
    // Get CSS var value roughly
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#6C63FF';
    
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.data.map(d => d.name),
        datasets: [{
          label: 'Tarefas',
          data: this.data.map(d => d.tarefas),
          backgroundColor: primaryColor,
          borderRadius: 4,
          barPercentage: 0.5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8' } },
          x: { grid: { display: false }, ticks: { color: '#94A3B8' } }
        }
      }
    });
  }

  private updateChart() {
    if (!this.chart) return;
    this.chart.data.labels = this.data.map(d => d.name);
    this.chart.data.datasets[0].data = this.data.map(d => d.tarefas);
    this.chart.update();
  }
}
