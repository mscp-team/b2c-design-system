import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cRadioButtonComponent, RadioOption } from './b2c-radio-button.component';

const OPTIONS: RadioOption[] = [
  { label: 'Mensal', value: 'monthly' },
  { label: 'Anual', value: 'annual' },
  { label: 'Inativo', value: 'inactive', disabled: true },
];

describe('B2cRadioButtonComponent', () => {
  let fixture: ComponentFixture<B2cRadioButtonComponent>;
  let component: B2cRadioButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cRadioButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cRadioButtonComponent);
    component = fixture.componentInstance;
    component.options = OPTIONS;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start with no selection', () => expect(component.value).toBe(''));

  it('should select an option', () => {
    component.select('monthly');
    expect(component.value).toBe('monthly');
  });

  it('should not select when disabled', () => {
    component.disabled = true;
    component.select('annual');
    expect(component.value).toBe('');
  });

  it('should emit radioChange on selection', () => {
    const spy = jasmine.createSpy('radioChange');
    component.radioChange.subscribe(spy);
    component.select('annual');
    expect(spy).toHaveBeenCalledWith('annual');
  });

  it('should render one label per option', () => {
    const labels = fixture.debugElement.queryAll(By.css('.b2c-radio'));
    expect(labels.length).toBe(3);
  });

  it('should mark selected option with checked class', () => {
    component.select('monthly');
    fixture.detectChanges();
    const checked = fixture.debugElement.queryAll(By.css('.b2c-radio--checked'));
    expect(checked.length).toBe(1);
  });

  it('should show error message when hasError=true', () => {
    component.hasError = true;
    component.errorMessage = 'Selecione uma opção';
    fixture.detectChanges();
    const err = fixture.debugElement.query(By.css('.b2c-radio-group__error'));
    expect(err.nativeElement.textContent).toContain('Selecione uma opção');
  });

  it('should support CVA — writeValue', () => {
    component.writeValue('annual');
    expect(component.value).toBe('annual');
  });

  it('should disable via setDisabledState', () => {
    component.setDisabledState(true);
    expect(component.disabled).toBeTrue();
  });
});
