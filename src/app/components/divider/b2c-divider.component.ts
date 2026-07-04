import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b2c-divider',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="b2c-divider" [class.b2c-divider--vertical]="vertical" [style.margin]="spacing">
      <span *ngIf="label" class="b2c-divider__label">{{ label }}</span>
    </div>
  `,
  styles: [``
    .b2c-divider {
      display: flex; align-items: center; gap: 12px;
      &::before, &::after { content: ''; flex: 1; height: 1px; background: var(--b2c-color-border); }
      &--vertical { flex-direction: column; width: 1px; height: 100%; &::before, &::after { width: 1px; height: auto; flex: 1; } }
      &__label { font-size: 12px; color: var(--b2c-color-text-disabled); white-space: nowrap; font-family: var(--b2c-font-family); }
    }
  ``],
})
export class B2cDividerComponent {
  @Input() label = '';
  @Input() vertical = false;
  @Input() spacing = '16px 0';
}
