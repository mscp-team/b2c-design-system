import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonModal, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-sheet',
  standalone: true,
  imports: [CommonModule, IonModal, IonContent],
  templateUrl: './b2c-sheet.component.html',
  styleUrls: ['./b2c-sheet.component.scss'],
})
export class B2cSheetComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() breakpoints: number[] = [0, 0.5, 1];
  @Input() initialBreakpoint = 0.5;
  @Output() closed = new EventEmitter<void>();
}
