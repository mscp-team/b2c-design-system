import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cDatePickerComponent } from './b2c-date-picker.component';

describe('B2cDatePickerComponent', () => {
  let fixture: ComponentFixture<B2cDatePickerComponent>;
  let component: B2cDatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cDatePickerComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start with no value', () => expect(component.value).toBeNull());

  it('should open calendar on toggleCalendar()', () => {
    component.toggleCalendar();
    expect(component.open).toBeTrue();
  });

  it('should close calendar on second toggleCalendar()', () => {
    component.toggleCalendar();
    component.toggleCalendar();
    expect(component.open).toBeFalse();
  });

  it('should not open when disabled', () => {
    component.disabled = true;
    component.toggleCalendar();
    expect(component.open).toBeFalse();
  });

  it('should build calendar weeks on open', () => {
    component.toggleCalendar();
    expect(component.weeks.length).toBeGreaterThan(0);
  });

  it('should apply size classes', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      component.size = size;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-date-picker'));
      expect(el.nativeElement.className).toContain(`b2c-date-picker--${size}`);
    }
  });

  it('should apply error class when hasError=true', () => {
    component.hasError = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-date-picker'));
    expect(el.nativeElement.className).toContain('b2c-date-picker--error');
  });

  it('should format display value for date type', () => {
    component.value = new Date(2024, 0, 15);
    expect(component.displayValue).toBe(new Date(2024, 0, 15).toLocaleDateString('pt-BR'));
  });

  it('should format display value for month type', () => {
    component.type = 'month';
    component.value = new Date(2024, 2, 1);
    expect(component.displayValue).toContain('Mar');
    expect(component.displayValue).toContain('2024');
  });

  it('should emit dateChange when selecting a day', () => {
    const spy = jasmine.createSpy('dateChange');
    component.dateChange.subscribe(spy);
    component.toggleCalendar();
    const availableDay = component.weeks.flat().find(d => d && !d.disabled && !d.otherMonth);
    if (availableDay) {
      component.selectDay(availableDay);
      expect(spy).toHaveBeenCalled();
    }
  });

  it('should navigate months with prevMonth() and nextMonth()', () => {
    const initial = component.viewMonth;
    component.nextMonth();
    expect(component.viewMonth).not.toBe(initial);
    component.prevMonth();
    expect(component.viewMonth).toBe(initial);
  });

  it('should support CVA — writeValue', () => {
    const d = new Date(2024, 5, 10);
    component.writeValue(d);
    expect(component.value).toEqual(d);
  });
});
