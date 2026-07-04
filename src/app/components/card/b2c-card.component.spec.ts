import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cCardComponent } from './b2c-card.component';

describe('B2cCardComponent', () => {
  let fixture: ComponentFixture<B2cCardComponent>;
  let component: B2cCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cCardComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render title and description', () => {
    component.title = 'Plano Ouro';
    component.description = 'Cobertura completa';
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.b2c-card__title')).nativeElement.textContent).toContain('Plano Ouro');
    expect(fixture.debugElement.query(By.css('.b2c-card__description')).nativeElement.textContent).toContain('Cobertura completa');
  });

  it('should apply select class when type=select', () => {
    component.type = 'select';
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.b2c-card'));
    expect(card.nativeElement.className).toContain('b2c-card--select');
  });

  it('should apply selected class when selected=true', () => {
    component.selected = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.b2c-card'));
    expect(card.nativeElement.className).toContain('b2c-card--selected');
  });

  it('should apply disabled class when disabled=true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.b2c-card'));
    expect(card.nativeElement.className).toContain('b2c-card--disabled');
  });

  it('should apply error class when hasError=true', () => {
    component.hasError = true;
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('.b2c-card'));
    expect(card.nativeElement.className).toContain('b2c-card--error');
  });

  it('should emit cardClick when clicked and not disabled', () => {
    const spy = jasmine.createSpy('cardClick');
    component.cardClick.subscribe(spy);
    component.onClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should not emit cardClick when disabled', () => {
    component.disabled = true;
    const spy = jasmine.createSpy('cardClick');
    component.cardClick.subscribe(spy);
    component.onClick();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should render image when imageSrc is set', () => {
    component.imageSrc = 'https://example.com/img.jpg';
    component.imageAlt = 'Plano';
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.b2c-card__image'));
    expect(img).toBeTruthy();
  });

  it('should emit actionClick when action button clicked', () => {
    component.actionLabel = 'Ver mais';
    fixture.detectChanges();
    const spy = jasmine.createSpy('actionClick');
    component.actionClick.subscribe(spy);
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    component.onActionClick(event);
    expect(spy).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
