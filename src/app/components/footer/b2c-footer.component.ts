import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FooterLink   { label: string; url: string; }
export interface FooterColumn { title: string; links: FooterLink[]; }

@Component({
  selector: 'b2c-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './b2c-footer.component.html',
  styleUrls: ['./b2c-footer.component.scss'],
})
export class B2cFooterComponent {
  @Input() columns: FooterColumn[] = [];
  @Input() copyright = `© ${new Date().getFullYear()} B2C. Todos os direitos reservados.`;
}
