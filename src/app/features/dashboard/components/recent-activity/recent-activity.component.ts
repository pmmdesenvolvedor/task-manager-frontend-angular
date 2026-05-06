import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-recent-activity',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './recent-activity.component.html',
  styleUrl: './recent-activity.component.scss'})
export class RecentActivityComponent {
  @Input() activities: { description: string; time: string; type: string }[] = [];
}
