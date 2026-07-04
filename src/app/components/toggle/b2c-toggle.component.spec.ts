import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cToggleComponent } from './b2c-toggle.component';

describe('B2cToggleComponent', () => {
  let fixture: ComponentFixture<B2cToggleComponent>;
  let component: B2cToggleComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cToggleComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start unchecked', () => expect(component.checked).toBeFalse());

  it('should toggle on call', () => {
    component.toggle();
    expect(component.checked).toBeTrue();
    component.toggle();
    expect(component.checked).toBeFalse();
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.checked).toBeFalse();
  });

  it('should emit toggleChange on toggle', () => {
    const spy = jasmine.createSpy('toggleChange');
    component.toggleChange.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should apply b2c-toggle--on class when checked', () => {
    component.toggle();
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.className).toContain('b2c-toggle--on');
  });

  it('should apply b2c-toggle--disabled class when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.className).toContain('b2c-toggle--disabled');
  });

  it('should return correct state', () => {
    expect(component.state).toBe('off');
    component.toggle();
    expect(component.state).toBe('on');
    component.checked = false;
    component.disabled = true;
    expect(component.state).toBe('disabled');
  });

  it('should support ControlValueAccessor — writeValue', () => {
    component.writeValue(true);
    expect(component.checked).toBeTrue();
    component.writeValue(false);
    expect(component.checked).toBeFalse();
  });

  it('should call onChange when toggled', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    component.toggle();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should disable via setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
    component.setDisabledState(false);
    expect(component.disabled).toBeFalse();
  });
});
