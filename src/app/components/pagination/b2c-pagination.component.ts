import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'b2c-pagination',
  standalone: true,
  imports: [CommonModule, IonIcon],
  templateUrl: './b2c-pagination.component.html',
  styleUrls: ['./b2c-pagination.component.scss'],
})
export class B2cPaginationComponent implements OnChanges {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() siblingCount = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages: number[] = [];

  ngOnChanges() { this.buildPages(); }

  buildPages() {
    const total = this.totalPages;
    const cur   = this.currentPage;
    const s     = this.siblingCount;
    const range = (a: number, b: number) =>
      Array.from({ length: b - a + 1 }, (_, i) => a + i);

    if (total <= 7) { this.pages = range(1, total); return; }

    const left  = Math.max(cur - s, 2);
    const right = Math.min(cur + s, total - 1);
    const showLeftDot  = left > 2;
    const showRightDot = right < total - 1;

    const middle = range(left, right);
    this.pages = [
      1,
      ...(showLeftDot  ? [-1] : [2]),
      ...middle,
      ...(showRightDot ? [-1] : [total - 1]),
      total,
    ];
  }

  goTo(p: number) { if (p > 0) { this.currentPage = p; this.pageChange.emit(p); this.buildPages(); } }
  prev() { this.goTo(this.currentPage - 1); }
  next() { this.goTo(this.currentPage + 1); }
}
