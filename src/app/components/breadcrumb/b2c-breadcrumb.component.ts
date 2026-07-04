import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export interface BreadcrumbItem { label: string; url?: string; }

@Component({
  selector: 'b2c-breadcrumb',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-breadcrumb.component.html',
  styleUrls: ['./b2c-breadcrumb.component.scss'],
})
export class B2cBreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
