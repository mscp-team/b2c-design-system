import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export interface NavItem { label: string; url: string; active?: boolean; }

@Component({
  selector: 'b2c-navbar',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-navbar.component.html',
  styleUrls: ['./b2c-navbar.component.scss'],
})
export class B2cNavbarComponent {
  @Input() logoUrl = '';
  @Input() logoAlt = 'Logo';
  @Input() brandName = 'B2C';
  @Input() navItems: NavItem[] = [];
  @Input() compact = false;
  @Output() menuToggle = new EventEmitter<void>();
}
