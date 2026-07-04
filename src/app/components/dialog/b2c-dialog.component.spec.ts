import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cDialogComponent } from './b2c-dialog.component';

describe('B2cDialogComponent', () => {
  let fixture: ComponentFixture<B2cDialogComponent>;
  let component: B2cDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cDialogComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not render overlay when visible=false', () => {
    expect(fixture.debugElement.query(By.css('.b2c-dialog-overlay'))).toBeNull();
  });

  it('should render overlay when visible=true', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.b2c-dialog-overlay'))).toBeTruthy();
  });

  it('should apply type class for each variant', () => {
    component.visible = true;
    for (const type of ['modal', 'fullscreen', 'bottom-sheet'] as const) {
      component.type = type;
      fixture.detectChanges();
      const dialog = fixture.debugElement.query(By.css('.b2c-dialog'));
      expect(dialog.nativeElement.className).toContain(`b2c-dialog--${type.replace('-sheet', '-sheet')}`);
    }
  });

  it('should display title and description', () => {
    component.visible = true;
    component.title = 'Confirmar ação';
    component.description = 'Tem certeza?';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.b2c-dialog__title')).nativeElement.textContent).toContain('Confirmar ação');
    expect(fixture.debugElement.query(By.css('.b2c-dialog__description')).nativeElement.textContent).toContain('Tem certeza?');
  });

  it('should emit confirmed and close on confirm()', () => {
    component.visible = true;
    const confirmSpy = jasmine.createSpy('confirmed');
    const closeSpy = jasmine.createSpy('closed');
    component.confirmed.subscribe(confirmSpy);
    component.closed.subscribe(closeSpy);
    component.confirm();
    expect(confirmSpy).toHaveBeenCalled();
    expect(closeSpy).toHaveBeenCalled();
    expect(component.visible).toBeFalse();
  });

  it('should emit cancelled and close on cancel()', () => {
    component.visible = true;
    const cancelSpy = jasmine.createSpy('cancelled');
    component.cancelled.subscribe(cancelSpy);
    component.cancel();
    expect(cancelSpy).toHaveBeenCalled();
    expect(component.visible).toBeFalse();
  });

  it('should close on overlay click when closeable=true', () => {
    component.visible = true;
    component.closeable = true;
    fixture.detectChanges();
    const event = { target: {}, currentTarget: {} } as unknown as MouseEvent;
    (event as any).target = event.currentTarget;
    component.onOverlayClick(event);
    expect(component.visible).toBeFalse();
  });

  it('should not close on overlay click when closeable=false', () => {
    component.visible = true;
    component.closeable = false;
    const event = { target: {}, currentTarget: {} } as unknown as MouseEvent;
    (event as any).target = event.currentTarget;
    component.onOverlayClick(event);
    expect(component.visible).toBeTrue();
  });
});
