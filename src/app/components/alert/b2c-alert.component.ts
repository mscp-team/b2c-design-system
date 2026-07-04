import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'b2c-alert',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-alert.component.html',
  styleUrls: ['./b2c-alert.component.scss'],
})
export class B2cAlertComponent {
  @Input() type: AlertType = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;
  visible = true;

  get iconName(): string {
    const icons: Record<AlertType, string> = {
      info: 'information-circle-outline',
      success: 'checkmark-circle-outline',
      warning: 'warning-outline',
      error: 'alert-circle-outline',
    };
    return icons[this.type];
  }

  dismiss() { this.visible = false; }
}
