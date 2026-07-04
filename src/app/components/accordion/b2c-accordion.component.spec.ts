import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cAccordionComponent } from './b2c-accordion.component';

describe('B2cAccordionComponent', () => {
  let fixture: ComponentFixture<B2cAccordionComponent>;
  let component: B2cAccordionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cAccordionComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cAccordionComponent);
    component = fixture.componentInstance;
    component.title = 'Pergunta';
    component.text = 'Resposta completa';
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start collapsed', () => expect(component.expanded).toBeFalse());

  it('should toggle expanded on toggle()', () => {
    component.toggle();
    expect(component.expanded).toBeTrue();
    component.toggle();
    expect(component.expanded).toBeFalse();
  });

  it('should emit expandedChange on toggle', () => {
    const spy = jasmine.createSpy('expandedChange');
    component.expandedChange.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should add expanded class when open', () => {
    component.toggle();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-accordion'));
    expect(el.nativeElement.className).toContain('b2c-accordion--expanded');
  });

  it('should hide body when collapsed', () => {
    const body = fixture.debugElement.query(By.css('.b2c-accordion__body'));
    expect(body.nativeElement.hidden).toBeTrue();
  });

  it('should show body when expanded', () => {
    component.toggle();
    fixture.detectChanges();
    const body = fixture.debugElement.query(By.css('.b2c-accordion__body'));
    expect(body.nativeElement.hidden).toBeFalse();
  });

  it('should display title text', () => {
    const title = fixture.debugElement.query(By.css('.b2c-accordion__title'));
    expect(title.nativeElement.textContent.trim()).toBe('Pergunta');
  });

  it('should render text content when content=text', () => {
    component.toggle();
    fixture.detectChanges();
    const text = fixture.debugElement.query(By.css('.b2c-accordion__text'));
    expect(text).toBeTruthy();
    expect(text.nativeElement.textContent).toContain('Resposta completa');
  });
});
