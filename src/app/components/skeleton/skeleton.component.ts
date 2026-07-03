import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonVariant = 'text'|'circular'|'rectangular'|'rounded';

@Component({
  selector: 'b2c-skeleton', standalone: true, imports: [CommonModule],
  template: `<div class="b2c-skeleton" [class]="classes" [style.width]="width" [style.height]="height" [attr.aria-hidden]="true"></div>`,
  styles: [`
    .b2c-skeleton { background:linear-gradient(90deg,var(--color-neutral-100) 25%,var(--color-neutral-50) 50%,var(--color-neutral-100) 75%); background-size:200% 100%; animation:b2c-shimmer 1.5s infinite; }
    @keyframes b2c-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
    .b2c-skeleton--text { height:1em; border-radius:var(--radius-xs); width:100%; }
    .b2c-skeleton--circular { border-radius:50%; width:40px; height:40px; }
    .b2c-skeleton--rectangular { border-radius:0; width:100%; height:100px; }
    .b2c-skeleton--rounded { border-radius:var(--radius-md); width:100%; height:100px; }
  `]
})
export class SkeletonComponent {
  @Input() variant: SkeletonVariant = 'text';
  @Input() width?: string;
  @Input() height?: string;
  get classes(): string { return `b2c-skeleton--${this.variant}`; }
}