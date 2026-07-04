import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-empty-state',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-empty-state.component.html',
  styleUrls: ['./b2c-empty-state.component.scss'],
})
export class B2cEmptyStateComponent {
  @Input() icon = 'file-tray-outline';
  @Input() title = 'Nenhum resultado encontrado';
  @Input() description = '';
}
