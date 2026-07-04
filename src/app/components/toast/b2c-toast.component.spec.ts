import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cToastComponent } from './b2c-toast.component';

describe('B2cToastComponent', () => {
  let fixture: ComponentFixture<B2cToastComponent>;
  let component: B2cToastComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cToastComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not render when visible=false', () => {
    expect(fixture.debugElement.query(By.css('.b2c-toast'))).toBeNull();
  });

  it('should render when visible=true', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.b2c-toast'))).toBeTruthy();
  });

  it('should apply type class for all variants', () => {
    component.visible = true;
    for (const type of ['info', 'danger', 'success', 'warning'] as const) {
      component.type = type;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-toast'));
      expect(el.nativeElement.className).toContain(`b2c-toast--${type}`);
    }
  });

  it('should render message', () => {
    component.visible = true;
    component.message = 'Operação realizada!';
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.b2c-toast__message'));
    expect(msg.nativeElement.textContent).toContain('Operação realizada!');
  });

  it('should auto-dismiss after duration', fakeAsync(() => {
    component.duration = 1000;
    component.show();
    expect(component.visible).toBeTrue();
    tick(1000);
    expect(component.visible).toBeFalse();
  }));

  it('should not auto-dismiss when duration=0', fakeAsync(() => {
    component.duration = 0;
    component.show();
    tick(5000);
    expect(component.visible).toBeTrue();
  }));

  it('should emit dismissed on dismiss()', () => {
    component.visible = true;
    const spy = jasmine.createSpy('dismissed');
    component.dismissed.subscribe(spy);
    component.dismiss();
    expect(spy).toHaveBeenCalled();
    expect(component.visible).toBeFalse();
  });
});
