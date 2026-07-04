import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { B2cTilesComponent, TileItem } from './b2c-tiles.component';

const TILES: TileItem[] = [
  { label: 'Início', icon: 'home' },
  { label: 'Extrato', icon: 'document-text', badge: 3 },
  { label: 'Bloqueado', icon: 'lock-closed', disabled: true },
];

describe('B2cTilesComponent', () => {
  let fixture: ComponentFixture<B2cTilesComponent>;
  let component: B2cTilesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cTilesComponent, IonicModule.forRoot(), RouterModule.forRoot([])],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cTilesComponent);
    component = fixture.componentInstance;
    component.tiles = TILES;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render one button per tile', () => {
    const btns = fixture.debugElement.queryAll(By.css('.b2c-tile'));
    expect(btns.length).toBe(3);
  });

  it('should display tile label', () => {
    const labels = fixture.debugElement.queryAll(By.css('.b2c-tile__label'));
    expect(labels[0].nativeElement.textContent.trim()).toBe('Início');
  });

  it('should apply disabled class to disabled tile', () => {
    const btns = fixture.debugElement.queryAll(By.css('.b2c-tile'));
    expect(btns[2].nativeElement.className).toContain('b2c-tile--disabled');
  });

  it('should show badge when badge is set', () => {
    const badge = fixture.debugElement.query(By.css('.b2c-tile__badge'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.textContent.trim()).toBe('3');
  });

  it('should emit tileClick on click', () => {
    const spy = jasmine.createSpy('tileClick');
    component.tileClick.subscribe(spy);
    component.onClick(TILES[0]);
    expect(spy).toHaveBeenCalledWith(TILES[0]);
  });

  it('should not emit tileClick for disabled tile', () => {
    const spy = jasmine.createSpy('tileClick');
    component.tileClick.subscribe(spy);
    component.onClick(TILES[2]);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply sm class when size=sm', () => {
    component.size = 'sm';
    fixture.detectChanges();
    const container = fixture.debugElement.query(By.css('.b2c-tiles'));
    expect(container.nativeElement.className).toContain('b2c-tiles--sm');
  });
});
