import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem { id: string; title: string; content: string; disabled?: boolean; }

@Component({
  selector: 'b2c-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="b2c-accordion" [class.b2c-accordion--multiple]="multiple">
      @for (item of items; track item.id) {
        <div class="b2c-accordion__item" [class.b2c-accordion__item--open]="isOpen(item.id)" [class.b2c-accordion__item--disabled]="item.disabled">
          <button class="b2c-accordion__trigger" [disabled]="item.disabled" [attr.aria-expanded]="isOpen(item.id)" [attr.aria-controls]="'panel-' + item.id" (click)="toggle(item.id)">
            <span class="b2c-accordion__title">{{ item.title }}</span>
            <span class="b2c-accordion__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          </button>
          <div class="b2c-accordion__panel" [id]="'panel-' + item.id" role="region" [attr.aria-hidden]="!isOpen(item.id)">
            <div class="b2c-accordion__content">{{ item.content }}</div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .b2c-accordion { width: 100%; }
    .b2c-accordion__item { border-bottom: 1px solid var(--color-border-default); }
    .b2c-accordion__trigger { display:flex; align-items:center; justify-content:space-between; width:100%; padding:var(--spacing-md) 0; background:none; border:none; cursor:pointer; font-size:var(--font-size-md); font-weight:var(--font-weight-medium); color:var(--color-text-default); text-align:left; transition:color var(--transition-fast); }
    .b2c-accordion__trigger:hover { color: var(--color-primary-600); }
    .b2c-accordion__trigger:disabled { color:var(--color-text-disabled); cursor:not-allowed; }
    .b2c-accordion__icon { flex-shrink:0; transition:transform var(--transition-normal); }
    .b2c-accordion__item--open .b2c-accordion__icon { transform:rotate(180deg); }
    .b2c-accordion__panel { display:grid; grid-template-rows:0fr; transition:grid-template-rows var(--transition-normal); overflow:hidden; }
    .b2c-accordion__item--open .b2c-accordion__panel { grid-template-rows:1fr; }
    .b2c-accordion__content { padding-bottom:var(--spacing-md); font-size:var(--font-size-sm); color:var(--color-text-subtle); line-height:var(--line-height-relaxed); min-height:0; }
  `]
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() multiple = false;
  @Output() itemToggled = new EventEmitter<{ id: string; open: boolean }>();
  private openIds = signal<Set<string>>(new Set());
  isOpen(id: string): boolean { return this.openIds().has(id); }
  toggle(id: string): void {
    this.openIds.update(ids => {
      const next = new Set(ids);
      if (next.has(id)) { next.delete(id); this.itemToggled.emit({ id, open: false }); }
      else { if (!this.multiple) next.clear(); next.add(id); this.itemToggled.emit({ id, open: true }); }
      return next;
    });
  }
}