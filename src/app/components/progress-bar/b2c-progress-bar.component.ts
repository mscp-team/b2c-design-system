import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b2c-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-progress-bar.component.html',
  styleUrls: ['./b2c-progress-bar.component.scss'],
})
export class B2cProgressBarComponent implements OnChanges {
  @Input() value = 0;
  @Input() indeterminate = false;
  @Input() showLabel = false;

  clampedValue = 0;

  ngOnChanges() {
    this.clampedValue = Math.min(100, Math.max(0, this.value));
  }
}
