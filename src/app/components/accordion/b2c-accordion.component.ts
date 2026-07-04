import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-accordion',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-accordion.component.html',
  styleUrls: ['./b2c-accordion.component.scss'],
})
export class B2cAccordionComponent {
  @Input() title = '';
  open = false;

  toggle() {
    this.open = !this.open;
  }
}
