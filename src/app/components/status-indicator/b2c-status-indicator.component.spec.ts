import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cStatusIndicatorComponent } from './b2c-status-indicator.component';

describe('B2cStatusIndicatorComponent', () => {
  let fixture: ComponentFixture<B2cStatusIndicatorComponent>;
  let component: B2cStatusIndicatorComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cStatusIndicatorComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cStatusIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should apply type class for all variants', () => {
    for (const type of ['info', 'danger', 'success', 'warning', 'neutral'] as const) {
      component.type = type;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-status'));
      expect(el.nativeElement.className).toContain(`b2c-status--${type}`);
    }
  });

  it('should display custom label when provided', () => {
    component.label = 'Em análise';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-status__label'));
    expect(el.nativeElement.textContent.trim()).toBe('Em análise');
  });

  it('should use default label when no label provided', () => {
    component.type = 'success';
    component.label = '';
    fixture.detectChanges();
    expect(component.displayLabel).toBe('Sucesso');
  });

  it('should show dot when showDot=true', () => {
    component.showDot = true;
    fixture.detectChanges();
    const dot = fixture.debugElement.query(By.css('.b2c-status__dot'));
    expect(dot).toBeTruthy();
  });

  it('should not show icon when showDot=true', () => {
    component.showDot = true;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.b2c-status__icon'));
    expect(icon).toBeNull();
  });

  it('should show icon when showIcon=true and showDot=false', () => {
    component.showIcon = true;
    component.showDot = false;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.b2c-status__icon'));
    expect(icon).toBeTruthy();
  });
});
