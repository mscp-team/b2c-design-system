import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cStepperComponent, Step } from './b2c-stepper.component';

const STEPS: Step[] = [
  { label: 'Dados Pessoais', status: 'completed' },
  { label: 'Endereço', status: 'active' },
  { label: 'Pagamento', status: 'pending' },
  { label: 'Confirmação', status: 'pending' },
];

describe('B2cStepperComponent', () => {
  let fixture: ComponentFixture<B2cStepperComponent>;
  let component: B2cStepperComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cStepperComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cStepperComponent);
    component = fixture.componentInstance;
    component.steps = STEPS;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render one step per item', () => {
    const steps = fixture.debugElement.queryAll(By.css('.b2c-stepper__step'));
    expect(steps.length).toBe(4);
  });

  it('should apply status class to each step', () => {
    const steps = fixture.debugElement.queryAll(By.css('.b2c-stepper__step'));
    expect(steps[0].nativeElement.className).toContain('b2c-stepper__step--completed');
    expect(steps[1].nativeElement.className).toContain('b2c-stepper__step--active');
    expect(steps[2].nativeElement.className).toContain('b2c-stepper__step--pending');
  });

  it('should emit stepClick when step is clicked', () => {
    const spy = jasmine.createSpy('stepClick');
    component.stepClick.subscribe(spy);
    component.onStepClick(STEPS[0], 0);
    expect(spy).toHaveBeenCalledWith({ step: STEPS[0], index: 0 });
  });

  it('should not emit stepClick for pending step when clickablePending=false', () => {
    component.clickablePending = false;
    const spy = jasmine.createSpy('stepClick');
    component.stepClick.subscribe(spy);
    component.onStepClick(STEPS[2], 2);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should advance to next step on next()', () => {
    component.next();
    expect(component.steps[1].status).toBe('completed');
    expect(component.steps[2].status).toBe('active');
  });

  it('should go back on prev()', () => {
    component.prev();
    expect(component.steps[0].status).toBe('active');
    expect(component.steps[1].status).toBe('pending');
  });

  it('should apply vertical class when direction=vertical', () => {
    component.direction = 'vertical';
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-stepper'));
    expect(el.nativeElement.className).toContain('b2c-stepper--vertical');
  });

  it('should display connectors between steps', () => {
    const connectors = fixture.debugElement.queryAll(By.css('.b2c-stepper__connector'));
    expect(connectors.length).toBe(3);
  });
});
