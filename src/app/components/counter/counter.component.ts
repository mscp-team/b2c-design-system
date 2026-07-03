import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'b2c-counter', standalone: true, imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterComponent), multi: true }],
  template: `
    <div class="b2c-counter" [class.b2c-counter--disabled]="disabled">
      <button class="b2c-counter__btn" type="button" aria-label="Diminuir" [disabled]="disabled||value<=min" (click)="decrement()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
      <span class="b2c-counter__value" aria-live="polite" [attr.aria-label]="'Quantidade: '+value">{{ value }}</span>
      <button class="b2c-counter__btn" type="button" aria-label="Aumentar" [disabled]="disabled||value>=max" (click)="increment()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
    </div>
  `,
  styles: [`
    .b2c-counter { display:inline-flex; align-items:center; border:1px solid var(--color-border-default); border-radius:var(--radius-sm); overflow:hidden; height:40px; }
    .b2c-counter--disabled { opacity:.5; }
    .b2c-counter__btn { display:flex; align-items:center; justify-content:center; width:40px; height:100%; background:none; border:none; cursor:pointer; color:var(--color-text-default); transition:background-color var(--transition-fast),color var(--transition-fast); }
    .b2c-counter__btn:hover:not(:disabled) { background:var(--color-primary-50); color:var(--color-primary-600); }
    .b2c-counter__btn:disabled { cursor:not-allowed; color:var(--color-neutral-300); }
    .b2c-counter__value { min-width:48px; text-align:center; font-size:var(--font-size-sm); font-weight:var(--font-weight-medium); color:var(--color-text-default); padding:0 var(--spacing-xs); border-left:1px solid var(--color-border-default); border-right:1px solid var(--color-border-default); line-height:38px; }
  `]
})
export class CounterComponent implements ControlValueAccessor {
  @Input() min=0; @Input() max=99; @Input() step=1; @Input() disabled=false;
  @Output() valueChange = new EventEmitter<number>();
  value = 0;
  private onChange = (_: number) => {};
  onTouched = () => {};
  writeValue(val: number): void { this.value = val ?? 0; }
  registerOnChange(fn: (_: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState(d: boolean): void { this.disabled = d; }
  increment(): void { this.update(Math.min(this.max, this.value+this.step)); }
  decrement(): void { this.update(Math.max(this.min, this.value-this.step)); }
  private update(val: number): void { this.value=val; this.onChange(val); this.valueChange.emit(val); this.onTouched(); }
}