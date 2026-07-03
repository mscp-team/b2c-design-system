import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProgressBarVariant = 'primary'|'success'|'warning'|'danger';
export type ProgressBarSize    = 'sm'|'md'|'lg';

@Component({
  selector: 'b2c-progress-bar', standalone: true, imports: [CommonModule],
  template: `
    <div class="b2c-progress-bar" [class]="classes">
      @if (label) { <div class="b2c-progress-bar__header"><span class="b2c-progress-bar__label">{{ label }}</span>@if(showPercent){<span class="b2c-progress-bar__value">{{ clampedValue }}%</span>}</div> }
      <div class="b2c-progress-bar__track" role="progressbar" [attr.aria-valuenow]="clampedValue" [attr.aria-valuemin]="0" [attr.aria-valuemax]="100" [attr.aria-label]="label||'Progresso'">
        <div class="b2c-progress-bar__fill" [style.width.%]="clampedValue" [class.b2c-progress-bar__fill--indeterminate]="indeterminate"></div>
      </div>
    </div>
  `,
  styles: [`
    .b2c-progress-bar { width:100%; }
    .b2c-progress-bar__header { display:flex; justify-content:space-between; align-items:center; margin-bottom:var(--spacing-xs); }
    .b2c-progress-bar__label,.b2c-progress-bar__value { font-size:var(--font-size-sm); color:var(--color-text-subtle); }
    .b2c-progress-bar__value { font-weight:var(--font-weight-medium); }
    .b2c-progress-bar__track { overflow:hidden; border-radius:var(--radius-full); background:var(--color-neutral-100); }
    .b2c-progress-bar--sm .b2c-progress-bar__track { height:4px; } .b2c-progress-bar--md .b2c-progress-bar__track { height:8px; } .b2c-progress-bar--lg .b2c-progress-bar__track { height:12px; }
    .b2c-progress-bar__fill { height:100%; border-radius:var(--radius-full); transition:width .4s ease; }
    .b2c-progress-bar--primary .b2c-progress-bar__fill { background:var(--color-primary-500); } .b2c-progress-bar--success .b2c-progress-bar__fill { background:var(--color-success-500); }
    .b2c-progress-bar--warning .b2c-progress-bar__fill { background:var(--color-warning-500); } .b2c-progress-bar--danger .b2c-progress-bar__fill { background:var(--color-danger-500); }
    .b2c-progress-bar__fill--indeterminate { width:40%!important; animation:b2c-progress-indeterminate 1.4s ease infinite; }
    @keyframes b2c-progress-indeterminate { 0%{transform:translateX(-100%)} 100%{transform:translateX(350%)} }
  `]
})
export class ProgressBarComponent {
  @Input() value=0; @Input() variant: ProgressBarVariant='primary'; @Input() size: ProgressBarSize='md';
  @Input() label?: string; @Input() showPercent=false; @Input() indeterminate=false;
  get clampedValue(): number { return Math.min(100,Math.max(0,this.value)); }
  get classes(): string { return `b2c-progress-bar--${this.variant} b2c-progress-bar--${this.size}`; }
}