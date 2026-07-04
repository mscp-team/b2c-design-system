import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cProgressBarComponent } from './b2c-progress-bar.component';

describe('B2cProgressBarComponent', () => {
  let fixture: ComponentFixture<B2cProgressBarComponent>;
  let component: B2cProgressBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cProgressBarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should clamp value to 0-100', () => {
    component.value = -10;
    expect(component.clampedValue).toBe(0);
    component.value = 150;
    expect(component.clampedValue).toBe(100);
    component.value = 50;
    expect(component.clampedValue).toBe(50);
  });

  it('should render fill with correct width', () => {
    component.value = 70;
    fixture.detectChanges();
    const fill = fixture.debugElement.query(By.css('.b2c-progress-bar__fill'));
    expect(fill.nativeElement.style.width).toBe('70%');
  });

  it('should display percent when showPercent=true', () => {
    component.value = 45;
    component.showPercent = true;
    fixture.detectChanges();
    const percent = fixture.debugElement.query(By.css('.b2c-progress-bar__percent'));
    expect(percent.nativeElement.textContent.trim()).toBe('45%');
  });

  it('should display label when set', () => {
    component.label = 'Upload';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.b2c-progress-bar__label'));
    expect(label.nativeElement.textContent.trim()).toBe('Upload');
  });

  it('should set aria-valuenow correctly', () => {
    component.value = 30;
    fixture.detectChanges();
    const track = fixture.debugElement.query(By.css('.b2c-progress-bar__track'));
    expect(track.nativeElement.getAttribute('aria-valuenow')).toBe('30');
  });
});
