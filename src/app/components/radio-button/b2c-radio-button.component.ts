import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RadioOption { label: string; value: string; disabled?: boolean; }

@Component({
  selector: 'b2c-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-radio-button.component.html',
  styleUrls: ['./b2c-radio-button.component.scss'],
})
export class B2cRadioButtonComponent {
  @Input() options: RadioOption[] = [];
  @Input() value = '';
  @Input() groupLabel = '';
  @Input() name = 'b2c-radio';
  @Input() horizontal = false;
  @Output() valueChange = new EventEmitter<string>();

  select(v: string) { this.value = v; this.valueChange.emit(v); }
}
