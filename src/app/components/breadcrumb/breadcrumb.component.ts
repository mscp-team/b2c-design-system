import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem { label: string; href?: string; routerLink?: string | string[]; active?: boolean; }

@Component({
  selector: 'b2c-breadcrumb', standalone: true, imports: [CommonModule, RouterModule],
  template: `
    <nav class="b2c-breadcrumb" aria-label="Breadcrumb">
      <ol class="b2c-breadcrumb__list">
        @for (item of items; track item.label; let last = $last) {
          <li class="b2c-breadcrumb__item" [class.b2c-breadcrumb__item--active]="last">
            @if (!last) {
              @if (item.routerLink) { <a class="b2c-breadcrumb__link" [routerLink]="item.routerLink">{{ item.label }}</a> }
              @else if (item.href) { <a class="b2c-breadcrumb__link" [href]="item.href">{{ item.label }}</a> }
              @else { <span class="b2c-breadcrumb__link">{{ item.label }}</span> }
              <span class="b2c-breadcrumb__separator" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            } @else { <span class="b2c-breadcrumb__current" aria-current="page">{{ item.label }}</span> }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    .b2c-breadcrumb__list { display:flex; align-items:center; flex-wrap:wrap; gap:2px; margin:0; padding:0; list-style:none; }
    .b2c-breadcrumb__item { display:flex; align-items:center; gap:2px; }
    .b2c-breadcrumb__link { font-size:var(--font-size-sm); color:var(--color-text-subtle); text-decoration:none; transition:color var(--transition-fast); }
    .b2c-breadcrumb__link:hover { color:var(--color-primary-600); text-decoration:underline; }
    .b2c-breadcrumb__separator { color:var(--color-neutral-300); display:flex; align-items:center; }
    .b2c-breadcrumb__current { font-size:var(--font-size-sm); font-weight:var(--font-weight-medium); color:var(--color-text-default); }
  `]
})
export class BreadcrumbComponent { @Input() items: BreadcrumbItem[] = []; }