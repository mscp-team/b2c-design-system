import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cDividerComponent } from './b2c-divider.component';

describe('B2cDividerComponent', () => {
  let fixture: ComponentFixture<B2cDividerComponent>;
  let component: B2cDividerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cDividerComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render divider element with role=separator', () => {
    const el = fixture.debugElement.query(By.css('.b2c-divider'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('role')).toBe('separator');
  });

  it('should apply horizontal class by default', () => {
    const el = fixture.debugElement.query(By.css('.b2c-divider'));
    expect(el.nativeElement.className).toContain('b2c-divider--horizontal');
  });

  it('should apply vertical class when direction=vertical', () => {
    component.direction = 'vertical';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-divider'));
    expect(el.nativeElement.className).toContain('b2c-divider--vertical');
  });

  it('should apply spaced class when variant=spaced', () => {
    component.variant = 'spaced';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-divider'));
    expect(el.nativeElement.className).toContain('b2c-divider--spaced');
  });

  it('should apply slim class when variant=slim', () => {
    component.variant = 'slim';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-divider'));
    expect(el.nativeElement.className).toContain('b2c-divider--slim');
  });
});
