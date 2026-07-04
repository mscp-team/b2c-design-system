import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cEmptyStateComponent } from './b2c-empty-state.component';

describe('B2cEmptyStateComponent', () => {
  let fixture: ComponentFixture<B2cEmptyStateComponent>;
  let component: B2cEmptyStateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cEmptyStateComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render default title', () => {
    const title = fixture.debugElement.query(By.css('.b2c-empty-state__title'));
    expect(title.nativeElement.textContent).toContain('Nenhum resultado encontrado');
  });

  it('should render custom title', () => {
    component.title = 'Sem dados';
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.b2c-empty-state__title'));
    expect(title.nativeElement.textContent.trim()).toBe('Sem dados');
  });

  it('should render description when provided', () => {
    component.description = 'Tente ajustar os filtros';
    fixture.detectChanges();
    const desc = fixture.debugElement.query(By.css('.b2c-empty-state__description'));
    expect(desc).toBeTruthy();
    expect(desc.nativeElement.textContent).toContain('Tente ajustar os filtros');
  });

  it('should not render description when empty', () => {
    component.description = '';
    fixture.detectChanges();
    const desc = fixture.debugElement.query(By.css('.b2c-empty-state__description'));
    expect(desc).toBeNull();
  });

  it('should render action button when actionLabel is set', () => {
    component.actionLabel = 'Limpar filtros';
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.b2c-empty-state__action'));
    expect(btn).toBeTruthy();
    expect(btn.nativeElement.textContent.trim()).toBe('Limpar filtros');
  });

  it('should emit actionClick on button click', () => {
    component.actionLabel = 'Tentar novamente';
    fixture.detectChanges();
    const spy = jasmine.createSpy('actionClick');
    component.actionClick.subscribe(spy);
    const btn = fixture.debugElement.query(By.css('.b2c-empty-state__action'));
    btn.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });
});
