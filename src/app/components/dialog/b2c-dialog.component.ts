import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonModal, IonHeader, IonToolbar, IonTitle, IonButtons,
  IonButton, IonIcon, IonContent, IonFooter
} from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-dialog',
  standalone: true,
  imports: [CommonModule, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonFooter],
  templateUrl: './b2c-dialog.component.html',
  styleUrls: ['./b2c-dialog.component.scss'],
})
export class B2cDialogComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() confirmLabel = 'Confirmar';
  @Input() cancelLabel = 'Cancelar';
  @Input() showFooter = true;
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel  = new EventEmitter<void>();
  @Output() closed  = new EventEmitter<void>();

  close() { this.isOpen = false; this.closed.emit(); }
}
