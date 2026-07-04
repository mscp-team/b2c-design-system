import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export interface TabItem { id: string; label: string; icon?: string; disabled?: boolean; }

@Component({
  selector: 'b2c-tab-list',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-tab-list.component.html',
  styleUrls: ['./b2c-tab-list.component.scss'],
})
export class B2cTabListComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Output() tabChange = new EventEmitter<string>();

  selectTab(id: string) { this.activeTab = id; this.tabChange.emit(id); }
}
