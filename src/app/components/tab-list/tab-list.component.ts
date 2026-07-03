import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem { id: string; label: string; disabled?: boolean; badge?: number|string; }

@Component({
  selector: 'b2c-tab-list', standalone: true, imports: [CommonModule],
  template: `
    <div class="b2c-tab-list" [class]="classes">
      <div class="b2c-tab-list__tabs" role="tablist" [attr.aria-label]="ariaLabel">
        @for (tab of tabs; track tab.id) {
          <button class="b2c-tab-list__tab" role="tab" type="button" [id]="'tab-'+tab.id" [class.b2c-tab-list__tab--active]="activeTab()===tab.id" [class.b2c-tab-list__tab--disabled]="tab.disabled" [disabled]="tab.disabled" [attr.aria-selected]="activeTab()===tab.id" [attr.aria-controls]="'panel-'+tab.id" [attr.tabindex]="activeTab()===tab.id?0:-1" (click)="select(tab.id)" (keydown)="onKeydown($event,tab.id)">
            {{ tab.label }}
            @if (tab.badge!==undefined) { <span class="b2c-tab-list__badge">{{ tab.badge }}</span> }
          </button>
        }
      </div>
      <ng-content/>
    </div>
  `,
  styles: [`
    .b2c-tab-list { width:100%; }
    .b2c-tab-list__tabs { display:flex; border-bottom:2px solid var(--color-border-default); overflow-x:auto; scrollbar-width:none; }
    .b2c-tab-list__tabs::-webkit-scrollbar { display:none; }
    .b2c-tab-list__tab { position:relative; flex-shrink:0; display:flex; align-items:center; gap:var(--spacing-xs); padding:var(--spacing-sm) var(--spacing-md); background:none; border:none; border-bottom:2px solid transparent; margin-bottom:-2px; font-family:var(--font-family-sans); font-size:var(--font-size-sm); font-weight:var(--font-weight-medium); color:var(--color-text-subtle); cursor:pointer; white-space:nowrap; transition:color var(--transition-fast),border-color var(--transition-fast); }
    .b2c-tab-list__tab:hover:not(:disabled) { color:var(--color-primary-600); }
    .b2c-tab-list__tab--active { color:var(--color-primary-600); border-bottom-color:var(--color-primary-500); font-weight:var(--font-weight-semibold); }
    .b2c-tab-list__tab--disabled { opacity:.45; cursor:not-allowed; }
    .b2c-tab-list__badge { background:var(--color-primary-100); color:var(--color-primary-700); font-size:10px; font-weight:var(--font-weight-semibold); padding:1px 6px; border-radius:var(--radius-full); }
    .b2c-tab-list--pills .b2c-tab-list__tabs { border-bottom:none; background:var(--color-neutral-50); padding:4px; border-radius:var(--radius-lg); }
    .b2c-tab-list--pills .b2c-tab-list__tab { border-radius:var(--radius-md); border-bottom:none; margin:0; }
    .b2c-tab-list--pills .b2c-tab-list__tab--active { background:var(--color-neutral-0); box-shadow:var(--shadow-sm); }
  `]
})
export class TabListComponent {
  @Input() tabs: TabItem[] = []; @Input() variant: 'line'|'pills'='line'; @Input() ariaLabel='Abas';
  @Output() tabSelected = new EventEmitter<string>();
  activeTab = signal('');
  @Input() set initialTab(id: string) { this.activeTab.set(id); }
  get classes(): string { return this.variant==='pills'?'b2c-tab-list--pills':''; }
  select(id: string): void { this.activeTab.set(id); this.tabSelected.emit(id); }
  onKeydown(event: KeyboardEvent, id: string): void {
    const ids=this.tabs.filter(t=>!t.disabled).map(t=>t.id),idx=ids.indexOf(id);
    if(event.key==='ArrowRight') this.select(ids[(idx+1)%ids.length]);
    if(event.key==='ArrowLeft') this.select(ids[(idx-1+ids.length)%ids.length]);
    if(event.key==='Home') this.select(ids[0]);
    if(event.key==='End') this.select(ids[ids.length-1]);
  }
}