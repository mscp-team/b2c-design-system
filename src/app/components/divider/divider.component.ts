import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DividerOrientation = 'horizontal'|'vertical';
export type DividerVariant = 'solid'|'dashed'|'dotted';

@Component({
  selector: 'b2c-divider', standalone: true, imports: [CommonModule],
  template: `<div class="b2c-divider" [class]="classes" role="separator" [attr.aria-orientation]="orientation">@if(label){<span class="b2c-divider__label">{{ label }}</span>}</div>`,
  styles: [`
    .b2c-divider { display:flex; align-items:center; gap:var(--spacing-sm); color:var(--color-text-subtle); font-size:var(--font-size-xs); }
    .b2c-divider::before,.b2c-divider::after { content:''; flex:1; border-top:1px solid var(--color-border-default); }
    .b2c-divider--dashed::before,.b2c-divider--dashed::after { border-top-style:dashed; }
    .b2c-divider--dotted::before,.b2c-divider--dotted::after { border-top-style:dotted; }
    .b2c-divider--vertical { width:1px; height:100%; flex-direction:column; align-self:stretch; }
    .b2c-divider--vertical::before,.b2c-divider--vertical::after { border-top:none; border-left:1px solid var(--color-border-default); flex:1; width:0; }
    .b2c-divider__label { white-space:nowrap; color:var(--color-text-subtle); }
  `]
})
export class DividerComponent {
  @Input() orientation: DividerOrientation = 'horizontal';
  @Input() variant: DividerVariant = 'solid';
  @Input() label?: string;
  get classes(): string { return `b2c-divider--${this.orientation} b2c-divider--${this.variant}`; }
}