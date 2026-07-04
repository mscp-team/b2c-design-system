import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cButtonComponent } from './b2c-button.component';

describe('B2cButtonComponent', () => {
  let fixture: ComponentFixture<B2cButtonComponent>;
  let component: B2cButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cButtonComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label text', () => {
    component.label = 'Confirmar';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.textContent).toContain('Confirmar');
  });

  it('should apply solid type class by default', () => {
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.className).toContain('b2c-btn--solid');
  });

  it('should apply outline type class', () => {
    component.type = 'outline';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.className).toContain('b2c-btn--outline');
  });

  it('should apply size classes: sm, md, lg', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      component.size = size;
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('button'));
      expect(btn.nativeElement.className).toContain(`b2c-btn--${size}`);
    }
  });

  it('should be disabled when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.disabled).toBeTrue();
  });

  it('should emit buttonClick on click when enabled', () => {
    const spy = jasmine.createSpy('buttonClick');
    component.buttonClick.subscribe(spy);
    const btn = fixture.debugElement.query(By.css('button'));
    btn.triggerEventHandler('click', new MouseEvent('click'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should NOT emit buttonClick when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jasmine.createSpy('buttonClick');
    component.buttonClick.subscribe(spy);
    component.onClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should NOT emit buttonClick when loading', () => {
    component.loading = true;
    fixture.detectChanges();
    const spy = jasmine.createSpy('buttonClick');
    component.buttonClick.subscribe(spy);
    component.onClick(new MouseEvent('click'));
    expect(spy).not.toHaveBeenCalled();
  });

  it('should show spinner when loading=true', () => {
    component.loading = true;
    fixture.detectChanges();
    const spinner = fixture.debugElement.query(By.css('ion-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should apply toggle class when toggled=true', () => {
    component.toggled = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('button'));
    expect(btn.nativeElement.className).toContain('b2c-btn--toggle');
  });

  it('should render icon when content=icon', () => {
    component.content = 'icon';
    component.icon = 'home';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('ion-icon'));
    expect(icon).toBeTruthy();
  });
});
