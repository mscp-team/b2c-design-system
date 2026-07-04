import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-stepper',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-stepper.component.html',
  styleUrls: ['./b2c-stepper.component.scss'],
})
export class B2cStepperComponent {
  @Input() steps: string[] = [];
  @Input() currentStep = 0;
}
