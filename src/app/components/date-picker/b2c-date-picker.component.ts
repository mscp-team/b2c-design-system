import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonDatetime } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-date-picker',
  standalone: true,
  imports: [CommonModule, IonDatetime],
  templateUrl: './b2c-date-picker.component.html',
  styleUrls: ['./b2c-date-picker.component.scss'],
})
export class B2cDatePickerComponent {
  @Input() label = '';
  @Input() value = '';
  @Input() min = '';
  @Input() max = '';
  @Input() presentation: 'date' | 'time' | 'date-time' = 'date';
  @Input() errorMessage = '';
  @Output() valueChange = new EventEmitter<string>();

  onDateChange(event: CustomEvent) {
    this.value = event.detail.value as string;
    this.valueChange.emit(this.value);
  }
}
