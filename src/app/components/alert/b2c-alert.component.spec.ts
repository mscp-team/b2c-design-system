import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cAlertComponent } from './b2c-alert.component';

describe('B2cAlertComponent', () => {
  let fixture: ComponentFixture<B2cAlertComponent>;
  let component: B2cAlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cAlertComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cAlertComponent);
    component = fixture.componentInstance;
    component.visible = true;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not render when visible=false', () => {
    component.visible = false;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-alert'));
    expect(el).toBeNull();
  });

  it('should render when visible=true', () => {
    const el = fixture.debugElement.query(By.css('.b2c-alert'));
    expect(el).toBeTruthy();
  });

  it('should apply type class for all variants', () => {
    for (const type of ['info', 'danger', 'success', 'warning', 'neutral'] as const) {
      component.type = type;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-alert'));
      expect(el.nativeElement.className).toContain(`b2c-alert--${type}`);
    }
  });

  it('should render title and message', () => {
    component.title = 'Atenção';
    component.message = 'Mensagem de alerta';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.b2c-alert__title'));
    const msg = fixture.debugElement.query(By.css('.b2c-alert__message'));
    expect(title.nativeElement.textContent).toContain('Atenção');
    expect(msg.nativeElement.textContent).toContain('Mensagem de alerta');
  });

  it('should show close button when dismissible=true', () => {
    component.dismissible = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.b2c-alert__close'));
    expect(btn).toBeTruthy();
  });

  it('should hide on dismiss()', () => {
    const spy = jasmine.createSpy('dismissed');
    component.dismissed.subscribe(spy);
    component.dismiss();
    fixture.detectChanges();
    expect(component.visible).toBeFalse();
    expect(spy).toHaveBeenCalled();
    const el = fixture.debugElement.query(By.css('.b2c-alert'));
    expect(el).toBeNull();
  });

  it('should have correct icon for each type', () => {
    expect(component.icon).toBe('information-circle');
    component.type = 'danger';
    expect(component.icon).toBe('alert-circle');
    component.type = 'success';
    expect(component.icon).toBe('checkmark-circle');
    component.type = 'warning';
    expect(component.icon).toBe('warning');
  });
});
