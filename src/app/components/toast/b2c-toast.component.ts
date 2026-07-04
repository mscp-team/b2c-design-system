import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

@Component({
  selector: 'b2c-toast',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-toast.component.html',
  styleUrls: ['./b2c-toast.component.scss'],
})
export class B2cToastComponent implements OnInit {
  @Input() type: ToastType = 'info';
  @Input() message = '';
  @Input() duration = 4000;
  visible = true;

  get iconName(): string {
    const m: Record<ToastType, string> = {
      success: 'checkmark-circle-outline',
      error:   'alert-circle-outline',
      warning: 'warning-outline',
      info:    'information-circle-outline',
    };
    return m[this.type];
  }

  ngOnInit() {
    if (this.duration > 0) setTimeout(() => this.dismiss(), this.duration);
  }

  dismiss() { this.visible = false; }
}
