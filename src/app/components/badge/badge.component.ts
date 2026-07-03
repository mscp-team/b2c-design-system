import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral' | 'info';
export type BadgeSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'b2c-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="b2c-badge" [class]="classes" [attr.aria-label]="label">@if(dot){<span class="b2c-badge__dot" aria-hidden="true"></span>}<ng-content/></span>`,
  styles: [`
    .b2c-badge { display:inline-flex; align-items:center; gap:4px; padding:var(--badge-padding-y) var(--badge-padding-x); border-radius:var(--badge-radius); font-size:var(--badge-font-size); font-weight:var(--badge-font-weight); line-height:1; white-space:nowrap; }
    .b2c-badge--sm { font-size:10px; padding:1px 6px; }
    .b2c-badge--md { font-size:var(--font-size-xs); padding:2px 8px; }
    .b2c-badge--lg { font-size:var(--font-size-sm); padding:4px 10px; }
    .b2c-badge--primary { background:var(--color-primary-100); color:var(--color-primary-700); }
    .b2c-badge--success { background:var(--color-success-100); color:var(--color-success-700); }
    .b2c-badge--warning { background:var(--color-warning-100); color:var(--color-warning-700); }
    .b2c-badge--danger  { background:var(--color-danger-100);  color:var(--color-danger-700);  }
    .b2c-badge--neutral { background:var(--color-neutral-100); color:var(--color-neutral-700); }
    .b2c-badge--info    { background:var(--color-primary-50);  color:var(--color-primary-600); }
    .b2c-badge__dot { width:6px; height:6px; border-radius:50%; background:currentColor; }
  `]
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'primary';
  @Input() size: BadgeSize = 'md';
  @Input() dot = false;
  @Input() label?: string;
  get classes(): string { return `b2c-badge--${this.variant} b2c-badge--${this.size}`; }
}