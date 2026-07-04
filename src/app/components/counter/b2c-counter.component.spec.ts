import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { B2cCounterComponent } from './b2c-counter.component';

describe('B2cCounterComponent', () => {
  let fixture: ComponentFixture<B2cCounterComponent>;
  let component: B2cCounterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cCounterComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start at 0', () => expect(component.value).toBe(0));

  it('should increment on increment()', () => {
    component.increment();
    expect(component.value).toBe(1);
  });

  it('should decrement on decrement()', () => {
    component.value = 5;
    component.decrement();
    expect(component.value).toBe(4);
  });

  it('should not exceed max', () => {
    component.max = 3;
    component.value = 3;
    component.increment();
    expect(component.value).toBe(3);
  });

  it('should not go below min', () => {
    component.min = 0;
    component.value = 0;
    component.decrement();
    expect(component.value).toBe(0);
  });

  it('should respect step', () => {
    component.step = 5;
    component.increment();
    expect(component.value).toBe(5);
  });

  it('should emit counterChange on increment/decrement', () => {
    const spy = jasmine.createSpy('counterChange');
    component.counterChange.subscribe(spy);
    component.increment();
    expect(spy).toHaveBeenCalledWith(1);
    component.decrement();
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should report canIncrement/canDecrement correctly', () => {
    component.min = 0; component.max = 1; component.value = 0;
    expect(component.canDecrement).toBeFalse();
    expect(component.canIncrement).toBeTrue();
    component.value = 1;
    expect(component.canDecrement).toBeTrue();
    expect(component.canIncrement).toBeFalse();
  });

  it('should not operate when disabled', () => {
    component.disabled = true;
    component.increment();
    component.decrement();
    expect(component.value).toBe(0);
  });

  it('should support CVA — writeValue', () => {
    component.writeValue(7);
    expect(component.value).toBe(7);
  });
});
