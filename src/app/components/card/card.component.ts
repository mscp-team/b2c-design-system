import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'outlined' | 'elevated' | 'filled';

@Component({
  selector: 'b2c-card', standalone: true, imports: [CommonModule],
  template: `
    <div class="b2c-card" [class]="classes" [attr.aria-label]="ariaLabel">
      @if (hasHeader) { <div class="b2c-card__header"><ng-content select="[slot=header]"/></div> }
      @if (imageUrl) { <div class="b2c-card__media"><img [src]="imageUrl" [alt]="imageAlt" class="b2c-card__image"/></div> }
      <div class="b2c-card__body"><ng-content/></div>
      @if (hasFooter) { <div class="b2c-card__footer"><ng-content select="[slot=footer]"/></div> }
    </div>
  `,
  styles: [`
    .b2c-card { background:var(--card-bg); border-radius:var(--card-radius); overflow:hidden; transition:box-shadow var(--transition-fast); }
    .b2c-card--default  { border:1px solid var(--color-border-default); }
    .b2c-card--outlined { border:1.5px solid var(--color-primary-300); }
    .b2c-card--elevated { box-shadow:var(--shadow-md); }
    .b2c-card--filled   { background:var(--color-neutral-50); }
    .b2c-card--interactive { cursor:pointer; }
    .b2c-card--interactive:hover { box-shadow:var(--shadow-lg); transform:translateY(-1px); }
    .b2c-card__header { padding:var(--card-padding) var(--card-padding) 0; }
    .b2c-card__media { width:100%; overflow:hidden; }
    .b2c-card__image { width:100%; height:200px; object-fit:cover; display:block; }
    .b2c-card__body { padding:var(--card-padding); }
    .b2c-card__footer { padding:0 var(--card-padding) var(--card-padding); }
  `]
})
export class CardComponent {
  @Input() variant: CardVariant = 'default';
  @Input() interactive = false;
  @Input() imageUrl?: string;
  @Input() imageAlt = '';
  @Input() hasHeader = false;
  @Input() hasFooter = false;
  @Input() ariaLabel?: string;
  get classes(): string { return [`b2c-card--${this.variant}`, this.interactive?'b2c-card--interactive':''].filter(Boolean).join(' '); }
}