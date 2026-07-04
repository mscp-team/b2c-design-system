import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cChipComponent } from './b2c-chip.component';

describe('B2cChipComponent', () => {
  let fixture: ComponentFixture<B2cChipComponent>;
  let component: B2cChipComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cChipComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cChipComponent);
    component = fixture.componentInstance;
    component.label = 'Angular';
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render label', () => {
    const el = fixture.debugElement.query(By.css('.b2c-chip__label'));
    expect(el.nativeElement.textContent.trim()).toBe('Angular');
  });

  it('should not be selected by default', () => expect(component.selected).toBeFalse());

  it('should toggle selection on toggle()', () => {
    component.toggle();
    expect(component.selected).toBeTrue();
    component.toggle();
    expect(component.selected).toBeFalse();
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.selected).toBeFalse();
  });

  it('should emit chipSelect on toggle', () => {
    const spy = jasmine.createSpy('chipSelect');
    component.chipSelect.subscribe(spy);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(true);
    component.toggle();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should emit chipRemove when remove button clicked', () => {
    component.removable = true;
    fixture.detectChanges();
    const spy = jasmine.createSpy('chipRemove');
    component.chipRemove.subscribe(spy);
    const event = new MouseEvent('click');
    spyOn(event, 'stopPropagation');
    component.onRemoveClick(event);
    expect(spy).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('should apply selected class when selected=true', () => {
    component.toggle();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-chip'));
    expect(el.nativeElement.className).toContain('b2c-chip--selected');
  });

  it('should show remove button when removable=true', () => {
    component.removable = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.b2c-chip__remove'));
    expect(btn).toBeTruthy();
  });
});
