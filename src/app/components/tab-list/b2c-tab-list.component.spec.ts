import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cTabListComponent, TabItem } from './b2c-tab-list.component';

const TABS: TabItem[] = [
  { label: 'Visão Geral', value: 'overview' },
  { label: 'Detalhes', value: 'details' },
  { label: 'Desativado', value: 'disabled', disabled: true },
];

describe('B2cTabListComponent', () => {
  let fixture: ComponentFixture<B2cTabListComponent>;
  let component: B2cTabListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cTabListComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cTabListComponent);
    component = fixture.componentInstance;
    component.tabs = TABS;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render one tab per item', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.b2c-tab'));
    expect(tabs.length).toBe(3);
  });

  it('should emit tabChange when a tab is selected', () => {
    const spy = jasmine.createSpy('tabChange');
    component.tabChange.subscribe(spy);
    component.select(TABS[1]);
    expect(spy).toHaveBeenCalledWith('details');
  });

  it('should not emit tabChange for disabled tab', () => {
    const spy = jasmine.createSpy('tabChange');
    component.tabChange.subscribe(spy);
    component.select(TABS[2]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply active class to selected tab', () => {
    component.select(TABS[0]);
    fixture.detectChanges();
    const active = fixture.debugElement.queryAll(By.css('.b2c-tab--active'));
    expect(active.length).toBe(1);
  });

  it('should apply disabled class to disabled tab', () => {
    const tabs = fixture.debugElement.queryAll(By.css('.b2c-tab'));
    expect(tabs[2].nativeElement.className).toContain('b2c-tab--disabled');
  });

  it('should support keyboard navigation — ArrowRight', () => {
    component.select(TABS[0]);
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.onKeyDown(event, TABS[0], 0);
    expect(component.activeValue).toBe('details');
  });
});
