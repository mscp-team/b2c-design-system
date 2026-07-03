import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize    = 'sm' | 'md' | 'lg';

@Component({
  selector: 'b2c-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="b2c-btn" [class]="classes" [disabled]="disabled || loading" [type]="type" [attr.aria-busy]="loading" (click)="onClick($event)">
      @if (loading) { <span class="b2c-btn__spinner" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="2" stroke-dasharray="37.7" stroke-dashoffset="10"/></svg></span> }
      @if (iconLeft && !loading) { <span class="b2c-btn__icon b2c-btn__icon--left" aria-hidden="true"><ng-content select="[slot=icon-left]"/></span> }
      <span class="b2c-btn__label"><ng-content/></span>
      @if (iconRight) { <span class="b2c-btn__icon b2c-btn__icon--right" aria-hidden="true"><ng-content select="[slot=icon-right]"/></span> }
    </button>
  `,
  styles: [`
    .b2c-btn { display:inline-flex; align-items:center; justify-content:center; gap:var(--spacing-xs); padding:0 var(--btn-padding-x-md); height:var(--btn-height-md); border:1.5px solid transparent; border-radius:var(--btn-radius); font-family:var(--font-family-sans); font-size:var(--btn-font-size); font-weight:var(--btn-font-weight); line-height:1; cursor:pointer; white-space:nowrap; user-select:none; transition:background-color var(--transition-fast),border-color var(--transition-fast),color var(--transition-fast); }
    .b2c-btn:focus-visible { outline:2px solid var(--color-border-focus); outline-offset:2px; }
    .b2c-btn:disabled { cursor:not-allowed; opacity:.45; }
    .b2c-btn--sm { height:var(--btn-height-sm); padding:0 var(--btn-padding-x-sm); font-size:var(--font-size-xs); }
    .b2c-btn--lg { height:var(--btn-height-lg); padding:0 var(--btn-padding-x-lg); font-size:var(--font-size-md); }
    .b2c-btn--primary { background-color:var(--color-primary-500); color:var(--color-text-on-primary); }
    .b2c-btn--primary:hover:not(:disabled) { background-color:var(--color-primary-600); }
    .b2c-btn--primary:active:not(:disabled) { background-color:var(--color-primary-700); }
    .b2c-btn--secondary { background-color:transparent; border-color:var(--color-primary-500); color:var(--color-primary-500); }
    .b2c-btn--secondary:hover:not(:disabled) { background-color:var(--color-primary-50); border-color:var(--color-primary-600); color:var(--color-primary-600); }
    .b2c-btn--ghost { background-color:transparent; color:var(--color-primary-500); }
    .b2c-btn--ghost:hover:not(:disabled) { background-color:var(--color-primary-50); }
    .b2c-btn--danger { background-color:var(--color-danger-500); color:#fff; }
    .b2c-btn--danger:hover:not(:disabled) { background-color:var(--color-danger-600); }
    .b2c-btn--link { background:none; border:none; color:var(--color-primary-500); text-decoration:underline; padding:0; height:auto; }
    .b2c-btn--full { width:100%; }
    .b2c-btn__spinner svg { animation:b2c-spin 0.8s linear infinite; }
    @keyframes b2c-spin { to { transform:rotate(360deg); } }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading  = false;
  @Input() fullWidth = false;
  @Input() iconLeft  = false;
  @Input() iconRight = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Output() clicked = new EventEmitter<MouseEvent>();
  get classes(): string { return [`b2c-btn--${this.variant}`,`b2c-btn--${this.size}`,this.fullWidth?'b2c-btn--full':'',this.loading?'b2c-btn--loading':''].filter(Boolean).join(' '); }
  onClick(event: MouseEvent): void { if (!this.disabled && !this.loading) this.clicked.emit(event); }
}