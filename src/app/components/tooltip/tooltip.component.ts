import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TooltipPosition = 'top'|'right'|'bottom'|'left';

@Component({
  selector: 'b2c-tooltip', standalone: true, imports: [CommonModule],
  template: `
    <div class="b2c-tooltip-wrapper" (mouseenter)="show()" (mouseleave)="hide()" (focusin)="show()" (focusout)="hide()">
      <ng-content/>
      @if (visible() && content) { <div class="b2c-tooltip" [class]="tooltipClasses" role="tooltip">{{ content }}</div> }
    </div>
  `,
  styles: [`
    .b2c-tooltip-wrapper { position:relative; display:inline-flex; }
    .b2c-tooltip { position:absolute; z-index:var(--z-tooltip); background:var(--tooltip-bg); color:var(--tooltip-color); font-size:var(--tooltip-font-size); padding:var(--tooltip-padding); border-radius:var(--tooltip-radius); pointer-events:none; animation:b2c-tooltip-in .1s ease; max-width:240px; white-space:normal; line-height:var(--line-height-normal); }
    @keyframes b2c-tooltip-in { from{opacity:0;transform:scale(.9)} to{opacity:1;transform:scale(1)} }
    .b2c-tooltip--top    { bottom:calc(100% + 8px); left:50%; transform:translateX(-50%); }
    .b2c-tooltip--bottom { top:calc(100% + 8px);    left:50%; transform:translateX(-50%); }
    .b2c-tooltip--left   { right:calc(100% + 8px);  top:50%;  transform:translateY(-50%); }
    .b2c-tooltip--right  { left:calc(100% + 8px);   top:50%;  transform:translateY(-50%); }
  `]
})
export class TooltipComponent {
  @Input() content = ''; @Input() position: TooltipPosition = 'top'; @Input() delay = 200;
  visible = signal(false);
  private timer?: ReturnType<typeof setTimeout>;
  get tooltipClasses(): string { return `b2c-tooltip--${this.position}`; }
  show(): void { this.timer = setTimeout(() => this.visible.set(true), this.delay); }
  hide(): void { clearTimeout(this.timer); this.visible.set(false); }
}