import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'b2c-avatar', standalone: true, imports: [CommonModule],
  template: `
    <div class="b2c-avatar" [class]="classes" [style.background-color]="!src ? bgColor : null">
      @if (src && !imgError()) { <img class="b2c-avatar__img" [src]="src" [alt]="alt" (error)="onImgError()"/> }
      @else if (initials) { <span class="b2c-avatar__initials" aria-hidden="true">{{ computedInitials() }}</span> }
      @else { <svg class="b2c-avatar__fallback" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg> }
      @if (status) { <span class="b2c-avatar__status" [class]="'b2c-avatar__status--' + status" [attr.aria-label]="'Status: ' + status"></span> }
    </div>
  `,
  styles: [`
    .b2c-avatar { position:relative; display:inline-flex; align-items:center; justify-content:center; border-radius:var(--avatar-radius); background-color:var(--color-primary-100); color:var(--color-primary-600); overflow:hidden; flex-shrink:0; }
    .b2c-avatar--sm { width:var(--avatar-size-sm); height:var(--avatar-size-sm); font-size:10px; }
    .b2c-avatar--md { width:var(--avatar-size-md); height:var(--avatar-size-md); font-size:var(--font-size-xs); }
    .b2c-avatar--lg { width:var(--avatar-size-lg); height:var(--avatar-size-lg); font-size:var(--font-size-sm); }
    .b2c-avatar--xl { width:var(--avatar-size-xl); height:var(--avatar-size-xl); font-size:var(--font-size-md); }
    .b2c-avatar--square { border-radius:var(--radius-sm); }
    .b2c-avatar__img { width:100%; height:100%; object-fit:cover; }
    .b2c-avatar__initials { font-weight:var(--font-weight-semibold); text-transform:uppercase; line-height:1; }
    .b2c-avatar__fallback { width:60%; height:60%; color:var(--color-neutral-400); }
    .b2c-avatar__status { position:absolute; bottom:0; right:0; width:30%; height:30%; border-radius:50%; border:2px solid var(--color-bg-page); }
    .b2c-avatar__status--online  { background:var(--color-success-500); }
    .b2c-avatar__status--offline { background:var(--color-neutral-300); }
    .b2c-avatar__status--busy    { background:var(--color-danger-500);  }
    .b2c-avatar__status--away    { background:var(--color-warning-500); }
  `]
})
export class AvatarComponent {
  @Input() src?: string; @Input() alt = ''; @Input() initials?: string;
  @Input() size: AvatarSize = 'md'; @Input() shape: 'circle'|'square' = 'circle';
  @Input() status?: 'online'|'offline'|'busy'|'away'; @Input() bgColor?: string;
  imgError = signal(false);
  computedInitials = computed(() => this.initials ? this.initials.slice(0,2).toUpperCase() : '');
  get classes(): string { return [`b2c-avatar--${this.size}`, this.shape==='square'?'b2c-avatar--square':''].filter(Boolean).join(' '); }
  onImgError(): void { this.imgError.set(true); }
}