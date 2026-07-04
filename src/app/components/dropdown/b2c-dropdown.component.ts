import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

export interface DropdownOption { label: string; value: string; }

@Component({
  selector: 'b2c-dropdown',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-dropdown.component.html',
  styleUrls: ['./b2c-dropdown.component.scss'],
})
export class B2cDropdownComponent {
  @Input() options: DropdownOption[] = [];
  @Input() value = '';
  @Input() label = '';
  @Input() placeholder = 'Selecione...';
  @Input() errorMessage = '';
  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  get selectedLabel() {
    return this.options.find(o => o.value === this.value)?.label ?? '';
  }

  toggleOpen() { this.isOpen = !this.isOpen; }
  select(opt: DropdownOption) { this.value = opt.value; this.valueChange.emit(opt.value); this.isOpen = false; }

  @HostListener('document:click', ['$event'])
  onOutsideClick(e: Event) {
    if (!(e.target as Element).closest('b2c-dropdown')) this.isOpen = false;
  }
}
