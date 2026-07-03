import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoadingVariant = 'spinner'|'dots';
export type LoadingSize    = 'sm'|'md'|'lg';

@Component({
  selector: 'b2c-loading', standalone: true, imports: [CommonModule],
  template: `
    @if (variant === 'spinner') {
      <div class="b2c-loading-spinner" [class]="spinnerClasses" [attr.aria-label]="label||'Carregando'" role="status">
        <svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="126" stroke-dashoffset="80"/></svg>
        @if (label) { <span class="b2c-loading__label">{{ label }}</span> }
      </div>
    }
    @if (variant === 'dots') {
      <div class="b2c-loading-dots" [attr.aria-label]="label||'Carregando'" role="status">
        <span class="b2c-loading-dots__dot"></span><span class="b2c-loading-dots__dot"></span><span class="b2c-loading-dots__dot"></span>
      </div>
    }
  `,
  styles: [`
    .b2c-loading-spinner { display:inline-flex; flex-direction:column; align-items:center; gap:var(--spacing-sm); color:var(--color-primary-500); }
    .b2c-loading-spinner svg { animation:b2c-spin .8s linear infinite; }
    .b2c-loading-spinner--sm svg { width:20px; height:20px; } .b2c-loading-spinner--md svg { width:32px; height:32px; } .b2c-loading-spinner--lg svg { width:48px; height:48px; }
    @keyframes b2c-spin { to { transform:rotate(360deg); } }
    .b2c-loading__label { font-size:var(--font-size-sm); color:var(--color-text-subtle); }
    .b2c-loading-dots { display:inline-flex; align-items:center; gap:6px; }
    .b2c-loading-dots__dot { width:8px; height:8px; border-radius:50%; background:var(--color-primary-500); animation:b2c-dots .8s ease-in-out infinite; }
    .b2c-loading-dots__dot:nth-child(2) { animation-delay:.15s; } .b2c-loading-dots__dot:nth-child(3) { animation-delay:.3s; }
    @keyframes b2c-dots { 0%,80%,100%{transform:scale(.6);opacity:.5} 40%{transform:scale(1);opacity:1} }
  `]
})
export class LoadingComponent {
  @Input() variant: LoadingVariant = 'spinner';
  @Input() size: LoadingSize = 'md';
  @Input() label?: string;
  get spinnerClasses(): string { return `b2c-loading-spinner--${this.size}`; }
}