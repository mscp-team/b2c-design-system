import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type ToggleSize = 'sm'|'md'|'lg';

@Component({
  selector: 'b2c-toggle', standalone: true, imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ToggleComponent), multi: true }],
  template: `
    <label class="b2c-toggle" [class.b2c-toggle--disabled]="disabled">
      <input class="b2c-toggle__input" type="checkbox" role="switch" [checked]="checked" [disabled]="disabled" [attr.aria-checked]="checked" [attr.aria-label]="ariaLabel||label||null" (change)="onChanged($event)" (blur)="onTouched()"/>
      <span class="b2c-toggle__track" [class]="trackClasses"><span class="b2c-toggle__thumb"></span></span>
      @if (label) { <span class="b2c-toggle__label">{{ label }}</span> }
    </label>
  `,
  styles: [`
    .b2c-toggle { display:inline-flex; align-items:center; gap:var(--spacing-sm); cursor:pointer; user-select:none; }
    .b2c-toggle--disabled { cursor:not-allowed; opacity:.5; }
    .b2c-toggle__input { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }
    .b2c-toggle__track { position:relative; border-radius:var(--radius-full); background:var(--color-neutral-300); transition:background-color var(--transition-fast); flex-shrink:0; }
    .b2c-toggle__track--sm { width:32px; height:18px; } .b2c-toggle__track--md { width:44px; height:24px; } .b2c-toggle__track--lg { width:56px; height:30px; }
    .b2c-toggle__track--checked { background:var(--color-primary-500); }
    .b2c-toggle__thumb { position:absolute; top:50%; left:3px; transform:translateY(-50%); border-radius:50%; background:var(--color-neutral-0); box-shadow:var(--shadow-sm); transition:left var(--transition-fast); }
    .b2c-toggle__track--sm .b2c-toggle__thumb { width:12px; height:12px; } .b2c-toggle__track--md .b2c-toggle__thumb { width:18px; height:18px; } .b2c-toggle__track--lg .b2c-toggle__thumb { width:24px; height:24px; }
    .b2c-toggle__track--sm.b2c-toggle__track--checked .b2c-toggle__thumb { left:calc(100% - 15px); }
    .b2c-toggle__track--md.b2c-toggle__track--checked .b2c-toggle__thumb { left:calc(100% - 21px); }
    .b2c-toggle__track--lg.b2c-toggle__track--checked .b2c-toggle__thumb { left:calc(100% - 27px); }
    .b2c-toggle__input:focus-visible + .b2c-toggle__track { outline:2px solid var(--color-border-focus); outline-offset:2px; }
    .b2c-toggle__label { font-size:var(--font-size-sm); color:var(--color-text-default); }
  `]
})
export class ToggleComponent implements ControlValueAccessor {
  @Input() label?: string; @Input() ariaLabel?: string; @Input() size: ToggleSize = 'md'; @Input() disabled = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  checked = false;
  private onChange = (_: boolean) => {};
  onTouched = () => {};
  get trackClasses(): string { return [`b2c-toggle__track--${this.size}`,this.checked?'b2c-toggle__track--checked':''].filter(Boolean).join(' '); }
  writeValue(val: boolean): void { this.checked = !!val; }
  registerOnChange(fn: (_: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
  onChanged(event: Event): void { const checked = (event.target as HTMLInputElement).checked; this.checked=checked; this.onChange(checked); this.checkedChange.emit(checked); }
}