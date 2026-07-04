import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cTooltipComponent } from './b2c-tooltip.component';

describe('B2cTooltipComponent', () => {
  let fixture: ComponentFixture<B2cTooltipComponent>;
  let component: B2cTooltipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cTooltipComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cTooltipComponent);
    component = fixture.componentInstance;
    component.text = 'Dica útil';
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not show tooltip by default', () => {
    const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
    expect(tooltip).toBeNull();
  });

  it('should show tooltip after show()', () => {
    component.show();
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
    expect(tooltip).toBeTruthy();
  });

  it('should hide tooltip after hide()', () => {
    component.show();
    fixture.detectChanges();
    component.hide();
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
    expect(tooltip).toBeNull();
  });

  it('should display tooltip text', () => {
    component.show();
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
    expect(tooltip.nativeElement.textContent).toContain('Dica útil');
  });

  it('should apply placement class', () => {
    component.show();
    for (const placement of ['top', 'bottom', 'left', 'right'] as const) {
      component.placement = placement;
      fixture.detectChanges();
      const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
      expect(tooltip.nativeElement.className).toContain(`b2c-tooltip--${placement}`);
    }
  });

  it('should not render tooltip when placement=none', () => {
    component.placement = 'none';
    component.show();
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
    expect(tooltip).toBeNull();
  });

  it('should apply size class', () => {
    component.show();
    component.size = 'lg';
    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.css('.b2c-tooltip'));
    expect(tooltip.nativeElement.className).toContain('b2c-tooltip--lg');
  });
});
