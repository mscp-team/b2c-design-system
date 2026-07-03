import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'b2c-pagination', standalone: true, imports: [CommonModule],
  template: `
    <nav class="b2c-pagination" aria-label="Paginação">
      <button class="b2c-pagination__btn b2c-pagination__btn--nav" type="button" aria-label="Página anterior" [disabled]="currentPage()<=1" (click)="prev()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      @for (page of pages(); track page) {
        @if (page==='...') { <span class="b2c-pagination__ellipsis" aria-hidden="true">…</span> }
        @else { <button class="b2c-pagination__btn" type="button" [class.b2c-pagination__btn--active]="page===currentPage()" [attr.aria-current]="page===currentPage()?'page':null" [attr.aria-label]="'Ir para a página '+page" (click)="goTo(+page)">{{ page }}</button> }
      }
      <button class="b2c-pagination__btn b2c-pagination__btn--nav" type="button" aria-label="Próxima página" [disabled]="currentPage()>=totalPages()" (click)="next()"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    </nav>
  `,
  styles: [`
    .b2c-pagination { display:flex; align-items:center; gap:4px; }
    .b2c-pagination__btn { display:flex; align-items:center; justify-content:center; min-width:36px; height:36px; padding:0 var(--spacing-xs); border:1px solid transparent; border-radius:var(--radius-sm); background:none; font-size:var(--font-size-sm); font-weight:var(--font-weight-medium); color:var(--color-text-subtle); cursor:pointer; transition:background-color var(--transition-fast),border-color var(--transition-fast),color var(--transition-fast); }
    .b2c-pagination__btn:hover:not(:disabled) { background:var(--color-neutral-50); color:var(--color-text-default); }
    .b2c-pagination__btn--active { background:var(--color-primary-500); color:#fff; border-color:var(--color-primary-500); }
    .b2c-pagination__btn--active:hover { background:var(--color-primary-600); }
    .b2c-pagination__btn:disabled { opacity:.4; cursor:not-allowed; }
    .b2c-pagination__ellipsis { display:flex; align-items:center; justify-content:center; min-width:36px; height:36px; font-size:var(--font-size-sm); color:var(--color-text-subtle); }
  `]
})
export class PaginationComponent {
  private _page = signal(1); private _total = signal(1);
  @Input() set page(v: number) { this._page.set(v); }
  @Input() set totalPages(v: number) { this._total.set(v); }
  @Input() siblingCount = 1;
  @Output() pageChange = new EventEmitter<number>();
  currentPage = this._page.asReadonly(); totalPages = this._total.asReadonly();
  pages = computed<(number|'...')[]>(() => {
    const current=this._page(),total=this._total(),delta=this.siblingCount+1,range:(number|'...')[]=[],left=Math.max(2,current-delta),right=Math.min(total-1,current+delta);
    range.push(1); if(left>2) range.push('...'); for(let i=left;i<=right;i++) range.push(i); if(right<total-1) range.push('...'); if(total>1) range.push(total);
    return range;
  });
  goTo(page: number): void { if(page<1||page>this._total()) return; this._page.set(page); this.pageChange.emit(page); }
  prev(): void { this.goTo(this._page()-1); } next(): void { this.goTo(this._page()+1); }
}