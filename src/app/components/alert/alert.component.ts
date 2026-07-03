import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'b2c-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="b2c-alert" [class]="classes" role="alert" [attr.aria-live]="live">
      <span class="b2c-alert__icon" aria-hidden="true">
        @switch (variant) {
          @case ('success') { <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 10l2.5 2.5 4.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> }
          @case ('warning') { <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L18.5 17H1.5L10 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v4M10 14.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> }
          @case ('danger')  { <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5M10 13.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> }
          @default { <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5M10 6.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg> }
        }
      </span>
      <div class="b2c-alert__body">@if(title){<p class="b2c-alert__title">{{ title }}</p>}<div class="b2c-alert__content"><ng-content/></div></div>
      @if (dismissible) { <button class="b2c-alert__close" type="button" aria-label="Fechar" (click)="dismiss()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M12 4L4 12M4 4l8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button> }
    </div>
  `,
  styles: [`
    .b2c-alert { display:flex; gap:var(--spacing-sm); padding:var(--spacing-md); border-radius:var(--radius-sm); border:1px solid transparent; }
    .b2c-alert--info    { background:var(--color-primary-50);  border-color:var(--color-primary-200);  color:var(--color-primary-700);  }
    .b2c-alert--success { background:var(--color-success-50);  border-color:var(--color-success-200);  color:var(--color-success-700);  }
    .b2c-alert--warning { background:var(--color-warning-50);  border-color:var(--color-warning-200);  color:var(--color-warning-700);  }
    .b2c-alert--danger  { background:var(--color-danger-50);   border-color:var(--color-danger-200);   color:var(--color-danger-700);   }
    .b2c-alert__icon { flex-shrink:0; display:flex; align-items:flex-start; padding-top:1px; }
    .b2c-alert__body { flex:1; }
    .b2c-alert__title { margin:0 0 4px; font-size:var(--font-size-sm); font-weight:var(--font-weight-semibold); line-height:1.4; }
    .b2c-alert__content { font-size:var(--font-size-sm); line-height:var(--line-height-relaxed); }
    .b2c-alert__close { flex-shrink:0; background:none; border:none; cursor:pointer; color:currentColor; opacity:.7; padding:2px; border-radius:var(--radius-xs); display:flex; align-items:center; transition:opacity var(--transition-fast); }
    .b2c-alert__close:hover { opacity:1; }
  `]
})
export class AlertComponent {
  @Input() variant: AlertVariant = 'info';
  @Input() title?: string;
  @Input() dismissible = false;
  @Input() live: 'polite' | 'assertive' = 'polite';
  @Output() dismissed = new EventEmitter<void>();
  get classes(): string { return `b2c-alert--${this.variant}`; }
  dismiss(): void { this.dismissed.emit(); }
}