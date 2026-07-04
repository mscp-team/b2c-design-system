import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { B2cBreadcrumbComponent, BreadcrumbItem } from './b2c-breadcrumb.component';

const ITEMS: BreadcrumbItem[] = [
  { label: 'Home', route: '/' },
  { label: 'Serviços', route: '/services' },
  { label: 'Plano Ouro' },
];

describe('B2cBreadcrumbComponent', () => {
  let fixture: ComponentFixture<B2cBreadcrumbComponent>;
  let component: B2cBreadcrumbComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cBreadcrumbComponent, IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cBreadcrumbComponent);
    component = fixture.componentInstance;
    component.items = ITEMS;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render one item per breadcrumb', () => {
    const items = fixture.debugElement.queryAll(By.css('.b2c-breadcrumb__item'));
    expect(items.length).toBe(3);
  });

  it('should render links for navigable items', () => {
    const links = fixture.debugElement.queryAll(By.css('.b2c-breadcrumb__link'));
    expect(links.length).toBe(2);
  });

  it('should mark last item as current page', () => {
    const current = fixture.debugElement.query(By.css('[aria-current="page"]'));
    expect(current).toBeTruthy();
    expect(current.nativeElement.textContent.trim()).toBe('Plano Ouro');
  });

  it('should render separators between items', () => {
    const separators = fixture.debugElement.queryAll(By.css('.b2c-breadcrumb__separator'));
    expect(separators.length).toBe(2);
  });
});
