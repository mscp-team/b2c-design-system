import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-counter',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-counter.component.html',
  styleUrls: ['./b2c-counter.component.scss'],
})
export class B2cCounterComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 99;
  @Input() step = 1;
  @Output() valueChange = new EventEmitter<number>();

  increment() { if (this.value < this.max) { this.value += this.step; this.valueChange.emit(this.value); } }
  decrement() { if (this.value > this.min) { this.value -= this.step; this.valueChange.emit(this.value); } }
}
