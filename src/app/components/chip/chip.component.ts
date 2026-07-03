import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ChipVariant = 'default'|'primary'|'success'|'warning'|'danger';

@Component({
  selector: 'b2c-chip', standalone: true, imports: [CommonModule],
  template: `
    <div class="b2c-chip" [class]="classes" [class.b2c-chip--selected]="selected" [attr.role]="selectable?'checkbox':null" [attr.aria-checked]="selectable?selected:null" [attr.tabindex]="selectable&&!disabled?0:null" (click)="onClick()" (keydown.enter)="onClick()" (keydown.space)="onClick()">
      @if (iconLeft) { <span class="b2c-chip__icon" aria-hidden="true"><ng-content select="[slot=icon]"/></span> }
      <span class="b2c-chip__label"><ng-content/></span>
      @if (removable) { <button class="b2c-chip__remove" type="button" [attr.aria-label]="'Remover '+label" (click).stop="onRemove()"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button> }
    </div>
  `,
  styles: [`
    .b2c-chip { display:inline-flex; align-items:center; gap:var(--spacing-xxs); height:var(--chip-height); padding:0 var(--spacing-sm); border-radius:var(--chip-radius); border:1px solid var(--color-border-default); background:var(--color-neutral-0); font-size:var(--chip-font-size); color:var(--color-text-default); white-space:nowrap; transition:background-color var(--transition-fast),border-color var(--transition-fast),color var(--transition-fast); }
    .b2c-chip--selectable { cursor:pointer; } .b2c-chip--selectable:hover { border-color:var(--color-primary-400); }
    .b2c-chip--selected { background:var(--color-primary-50); border-color:var(--color-primary-500); color:var(--color-primary-600); }
    .b2c-chip--disabled { opacity:.5; pointer-events:none; }
    .b2c-chip--primary { background:var(--color-primary-100); border-color:var(--color-primary-300); color:var(--color-primary-700); }
    .b2c-chip--success { background:var(--color-success-100); border-color:var(--color-success-300); color:var(--color-success-700); }
    .b2c-chip--warning { background:var(--color-warning-100); border-color:var(--color-warning-300); color:var(--color-warning-700); }
    .b2c-chip--danger  { background:var(--color-danger-100);  border-color:var(--color-danger-300);  color:var(--color-danger-700);  }
    .b2c-chip__icon { display:flex; align-items:center; }
    .b2c-chip__remove { display:flex; align-items:center; justify-content:center; background:none; border:none; cursor:pointer; padding:2px; border-radius:50%; color:currentColor; opacity:.7; transition:opacity var(--transition-fast),background-color var(--transition-fast); }
    .b2c-chip__remove:hover { opacity:1; background:rgba(0,0,0,.08); }
  `]
})
export class ChipComponent {
  @Input() variant: ChipVariant = 'default'; @Input() selected = false; @Input() selectable = false;
  @Input() removable = false; @Input() disabled = false; @Input() iconLeft = false; @Input() label = '';
  @Output() selectedChange = new EventEmitter<boolean>(); @Output() removed = new EventEmitter<void>();
  get classes(): string { return [`b2c-chip--${this.variant}`,this.selectable?'b2c-chip--selectable':'',this.disabled?'b2c-chip--disabled':''].filter(Boolean).join(' '); }
  onClick(): void { if (!this.selectable||this.disabled) return; this.selected=!this.selected; this.selectedChange.emit(this.selected); }
  onRemove(): void { if (!this.disabled) this.removed.emit(); }
}