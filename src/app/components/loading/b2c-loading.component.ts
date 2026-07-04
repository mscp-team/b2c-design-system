import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-loading',
  standalone: true,
  imports: [CommonModule, IonSpinner],
  templateUrl: './b2c-loading.component.html',
  styleUrls: ['./b2c-loading.component.scss'],
})
export class B2cLoadingComponent {
  @Input() visible = true;
  @Input() overlay = false;
  @Input() message = '';
  @Input() spinner: 'bubbles'|'circles'|'circular'|'crescent'|'dots'|'lines'|'lines-small' = 'circular';
}
