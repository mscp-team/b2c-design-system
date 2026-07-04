import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { B2cFormFieldComponent } from './b2c-form-field.component';

describe('B2cFormFieldComponent', () => {
  let fixture: ComponentFixture<B2cFormFieldComponent>;
  let component: B2cFormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cFormFieldComponent, FormsModule, ReactiveFormsModule, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render label', () => {
    component.label = 'E-mail';
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.b2c-form-field__label'));
    expect(label.nativeElement.textContent.trim()).toBe('E-mail');
  });

  it('should apply size classes', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      component.size = size;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-form-field'));
      expect(el.nativeElement.className).toContain(`b2c-form-field--${size}`);
    }
  });

  it('should apply error class when hasError=true', () => {
    component.hasError = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-form-field'));
    expect(el.nativeElement.className).toContain('b2c-form-field--error');
  });

  it('should apply disabled class when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-form-field'));
    expect(el.nativeElement.className).toContain('b2c-form-field--disabled');
  });

  it('should show error message when hasError and errorMessage are set', () => {
    component.hasError = true;
    component.errorMessage = 'Campo inválido';
    fixture.detectChanges();
    const err = fixture.debugElement.query(By.css('.b2c-form-field__error'));
    expect(err).toBeTruthy();
    expect(err.nativeElement.textContent).toContain('Campo inválido');
  });

  it('should show helper text when set and no error', () => {
    component.helperText = 'Digite seu e-mail corporativo';
    fixture.detectChanges();
    const helper = fixture.debugElement.query(By.css('.b2c-form-field__helper'));
    expect(helper).toBeTruthy();
    expect(helper.nativeElement.textContent).toContain('Digite seu e-mail corporativo');
  });

  it('should show character count when maxLength is set', () => {
    component.maxLength = 100;
    component.value = 'Olá';
    fixture.detectChanges();
    const count = fixture.debugElement.query(By.css('.b2c-form-field__count'));
    expect(count).toBeTruthy();
    expect(count.nativeElement.textContent).toContain('3/100');
  });

  it('should toggle password visibility', () => {
    component.type = 'password';
    fixture.detectChanges();
    expect(component.inputType).toBe('password');
    component.togglePasswordVisibility();
    expect(component.inputType).toBe('text');
    component.togglePasswordVisibility();
    expect(component.inputType).toBe('password');
  });

  it('should emit valueChange on input', () => {
    const spy = jasmine.createSpy('valueChange');
    component.valueChange.subscribe(spy);
    component.onInput('teste@email.com');
    expect(spy).toHaveBeenCalledWith('teste@email.com');
  });

  it('should emit focusChange on focus/blur', () => {
    const spy = jasmine.createSpy('focusChange');
    component.focusChange.subscribe(spy);
    component.onFocus();
    expect(spy).toHaveBeenCalledWith(true);
    component.onBlur();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should support CVA — writeValue', () => {
    component.writeValue('valor inicial');
    expect(component.value).toBe('valor inicial');
  });

  it('should apply readonly class when readonly=true', () => {
    component.readonly = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-form-field'));
    expect(el.nativeElement.className).toContain('b2c-form-field--readonly');
  });

  it('should apply success class when hasSuccess=true', () => {
    component.hasSuccess = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-form-field'));
    expect(el.nativeElement.className).toContain('b2c-form-field--success');
  });
});
