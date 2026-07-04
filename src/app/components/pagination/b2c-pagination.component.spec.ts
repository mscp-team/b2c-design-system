import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cPaginationComponent } from './b2c-pagination.component';

describe('B2cPaginationComponent', () => {
  let fixture: ComponentFixture<B2cPaginationComponent>;
  let component: B2cPaginationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cPaginationComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cPaginationComponent);
    component = fixture.componentInstance;
    component.totalPages = 10;
    component.currentPage = 1;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should disable prev button on first page', () => {
    const prev = fixture.debugElement.queryAll(By.css('.b2c-pagination__btn--nav'))[0];
    expect(prev.nativeElement.disabled).toBeTrue();
  });

  it('should disable next button on last page', () => {
    component.currentPage = 10;
    fixture.detectChanges();
    const btns = fixture.debugElement.queryAll(By.css('.b2c-pagination__btn--nav'));
    expect(btns[1].nativeElement.disabled).toBeTrue();
  });

  it('should emit pageChange when go() is called', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChange.subscribe(spy);
    component.go(3);
    expect(spy).toHaveBeenCalledWith(3);
    expect(component.currentPage).toBe(3);
  });

  it('should not emit pageChange for same page', () => {
    const spy = jasmine.createSpy('pageChange');
    component.pageChange.subscribe(spy);
    component.go(1);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should advance page on next()', () => {
    component.next();
    expect(component.currentPage).toBe(2);
  });

  it('should go back on prev()', () => {
    component.currentPage = 5;
    component.prev();
    expect(component.currentPage).toBe(4);
  });

  it('should not go below page 1 on prev()', () => {
    component.prev();
    expect(component.currentPage).toBe(1);
  });

  it('should show ellipsis for large page counts', () => {
    component.currentPage = 1;
    component.totalPages = 20;
    fixture.detectChanges();
    const ellipsis = fixture.debugElement.queryAll(By.css('.b2c-pagination__ellipsis'));
    expect(ellipsis.length).toBeGreaterThan(0);
  });

  it('should mark active page button with active class', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const activeBtns = fixture.debugElement.queryAll(By.css('.b2c-pagination__btn--active'));
    expect(activeBtns.length).toBe(1);
    expect(activeBtns[0].nativeElement.textContent.trim()).toBe('1');
  });
});
