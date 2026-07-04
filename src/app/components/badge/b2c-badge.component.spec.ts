import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cBadgeComponent } from './b2c-badge.component';

describe('B2cBadgeComponent', () => {
  let fixture: ComponentFixture<B2cBadgeComponent>;
  let component: B2cBadgeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cBadgeComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render label text', () => {
    component.label = 'Ativo';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-badge'));
    expect(el.nativeElement.textContent.trim()).toBe('Ativo');
  });

  it('should apply tone class for all variants', () => {
    const tones = ['default', 'success', 'danger', 'warning', 'neutral'] as const;
    for (const tone of tones) {
      component.tone = tone;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-badge'));
      expect(el.nativeElement.className).toContain(`b2c-badge--${tone}`);
    }
  });

  it('should display count when count is set', () => {
    component.count = 5;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-badge'));
    expect(el.nativeElement.textContent.trim()).toBe('5');
  });

  it('should cap count display at 99+', () => {
    component.count = 120;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-badge'));
    expect(el.nativeElement.textContent.trim()).toBe('99+');
  });

  it('should prefer count over label when both are set', () => {
    component.label = 'Label';
    component.count = 3;
    fixture.detectChanges();
    expect(component.displayValue).toBe('3');
  });
});
