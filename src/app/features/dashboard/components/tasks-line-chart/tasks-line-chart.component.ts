import { Component, ElementRef, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-tasks-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-line-chart.component.html',
  styleUrl: './tasks-line-chart.component.scss'})
export class TasksLineChartComponent implements AfterViewInit, OnChanges {
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
    
    const infoColor = getComputedStyle(document.documentElement).getPropertyValue('--color-info').trim() || '#00c2ff';
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, 'rgba(0, 194, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 194, 255, 0)');
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.data.map(d => d.name),
        datasets: [{
          data: this.data.map(d => d.tarefas),
          borderColor: infoColor,
          backgroundColor: gradient,
          borderWidth: 2,
          pointBackgroundColor: infoColor,
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94A3B8', stepSize: 1 } },
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
