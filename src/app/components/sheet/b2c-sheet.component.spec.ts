import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cSheetComponent } from './b2c-sheet.component';

describe('B2cSheetComponent', () => {
  let fixture: ComponentFixture<B2cSheetComponent>;
  let component: B2cSheetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cSheetComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should not render when visible=false', () => {
    expect(fixture.debugElement.query(By.css('.b2c-sheet-overlay'))).toBeNull();
  });

  it('should render when visible=true', () => {
    component.visible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.b2c-sheet-overlay'))).toBeTruthy();
  });

  it('should apply type class', () => {
    component.visible = true;
    for (const type of ['sharp', 'rounded', 'bottom-list'] as const) {
      component.type = type;
      fixture.detectChanges();
      const sheet = fixture.debugElement.query(By.css('.b2c-sheet'));
      expect(sheet.nativeElement.className).toContain(`b2c-sheet--${type}`);
    }
  });

  it('should show title when set', () => {
    component.visible = true;
    component.title = 'Opções';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.b2c-sheet__title'));
    expect(title.nativeElement.textContent.trim()).toBe('Opções');
  });

  it('should close and emit closed', () => {
    component.visible = true;
    const spy = jasmine.createSpy('closed');
    component.closed.subscribe(spy);
    component.close();
    expect(component.visible).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });

  it('should close on overlay click when closeable', () => {
    component.visible = true;
    component.closeable = true;
    const target = {};
    const event = { target, currentTarget: target } as unknown as MouseEvent;
    component.onOverlayClick(event);
    expect(component.visible).toBeFalse();
  });

  it('should show drag handle for rounded type', () => {
    component.visible = true;
    component.type = 'rounded';
    fixture.detectChanges();
    const handle = fixture.debugElement.query(By.css('.b2c-sheet__handle'));
    expect(handle).toBeTruthy();
  });

  it('should not show drag handle for sharp type', () => {
    component.visible = true;
    component.type = 'sharp';
    fixture.detectChanges();
    const handle = fixture.debugElement.query(By.css('.b2c-sheet__handle'));
    expect(handle).toBeNull();
  });
});
