import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cCheckboxComponent } from './b2c-checkbox.component';

describe('B2cCheckboxComponent', () => {
  let fixture: ComponentFixture<B2cCheckboxComponent>;
  let component: B2cCheckboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cCheckboxComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start unchecked', () => expect(component.checked).toBeFalse());

  it('should toggle checked state on toggle()', () => {
    component.toggle();
    expect(component.checked).toBeTrue();
    component.toggle();
    expect(component.checked).toBeFalse();
  });

  it('should clear indeterminate state on toggle', () => {
    component.indeterminate = true;
    component.toggle();
    expect(component.indeterminate).toBeFalse();
    expect(component.checked).toBeTrue();
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.checked).toBeFalse();
  });

  it('should emit checkboxChange with correct value', () => {
    const spy = jasmine.createSpy('checkboxChange');
    component.checkboxChange.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should return correct selection', () => {
    expect(component.selection).toBe('unchecked');
    component.indeterminate = true;
    expect(component.selection).toBe('indeterminate');
    component.indeterminate = false;
    component.checked = true;
    expect(component.selection).toBe('checked');
  });

  it('should return correct state', () => {
    expect(component.state).toBe('default');
    component.disabled = true;
    expect(component.state).toBe('disabled');
    component.disabled = false;
    component.hasError = true;
    expect(component.state).toBe('error');
  });

  it('should show error message when hasError=true and errorMessage set', () => {
    component.hasError = true;
    component.errorMessage = 'Campo obrigatório';
    fixture.detectChanges();
    const err = fixture.debugElement.query(By.css('.b2c-checkbox__error'));
    expect(err).toBeTruthy();
    expect(err.nativeElement.textContent).toContain('Campo obrigatório');
  });

  it('should apply checked class', () => {
    component.checked = true;
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('label'));
    expect(label.nativeElement.className).toContain('b2c-checkbox--checked');
  });

  it('should support CVA — writeValue, onChange, setDisabledState', () => {
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    component.writeValue(true);
    expect(component.checked).toBeTrue();
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });
});
