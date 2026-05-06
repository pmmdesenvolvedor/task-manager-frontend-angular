import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss'})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '1rem';
  @Input() borderRadius = '0.25rem';
}
