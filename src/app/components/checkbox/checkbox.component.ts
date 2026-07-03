import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b2c-checkbox', standalone: true, imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CheckboxComponent), multi: true }],
  template: `
    <label class="b2c-checkbox" [class.b2c-checkbox--disabled]="disabled" [class.b2c-checkbox--indeterminate]="indeterminate">
      <input class="b2c-checkbox__input" type="checkbox" [checked]="checked" [disabled]="disabled" [indeterminate]="indeterminate" [attr.aria-label]="ariaLabel||null" [attr.name]="name" [attr.id]="inputId" (change)="onChanged($event)" (blur)="onTouched()"/>
      <span class="b2c-checkbox__box" aria-hidden="true">
        @if (indeterminate) { <svg width="12" height="2" viewBox="0 0 12 2" fill="currentColor"><rect width="12" height="2" rx="1"/></svg> }
        @else { <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L4 7L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> }
      </span>
      @if (label) { <span class="b2c-checkbox__label">{{ label }}</span> } @else { <span class="b2c-checkbox__label"><ng-content/></span> }
    </label>
  `,
  styles: [`
    .b2c-checkbox { display:inline-flex; align-items:flex-start; gap:var(--spacing-xs); cursor:pointer; user-select:none; }
    .b2c-checkbox--disabled { cursor:not-allowed; opacity:.5; }
    .b2c-checkbox__input { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; }
    .b2c-checkbox__box { flex-shrink:0; display:flex; align-items:center; justify-content:center; width:18px; height:18px; border:1.5px solid var(--color-border-default); border-radius:var(--radius-xs); background:var(--color-neutral-0); color:transparent; transition:background-color var(--transition-fast),border-color var(--transition-fast),color var(--transition-fast); margin-top:1px; }
    .b2c-checkbox__input:checked + .b2c-checkbox__box, .b2c-checkbox--indeterminate .b2c-checkbox__box { background:var(--color-primary-500); border-color:var(--color-primary-500); color:#fff; }
    .b2c-checkbox__input:focus-visible + .b2c-checkbox__box { outline:2px solid var(--color-border-focus); outline-offset:2px; }
    .b2c-checkbox__label { font-size:var(--font-size-sm); color:var(--color-text-default); line-height:1.4; }
  `]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label?: string; @Input() disabled = false; @Input() indeterminate = false;
  @Input() name?: string; @Input() inputId?: string; @Input() ariaLabel?: string;
  @Output() checkedChange = new EventEmitter<boolean>();
  checked = false;
  private onChange = (_: boolean) => {};
  onTouched = () => {};
  writeValue(val: boolean): void { this.checked = !!val; }
  registerOnChange(fn: (_: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(disabled: boolean): void { this.disabled = disabled; }
  onChanged(event: Event): void { const checked = (event.target as HTMLInputElement).checked; this.checked = checked; this.onChange(checked); this.checkedChange.emit(checked); }
}