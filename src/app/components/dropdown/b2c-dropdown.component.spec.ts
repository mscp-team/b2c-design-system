import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { B2cDropdownComponent, DropdownOption } from './b2c-dropdown.component';

const OPTIONS: DropdownOption[] = [
  { label: 'São Paulo', value: 'sp' },
  { label: 'Rio de Janeiro', value: 'rj' },
  { label: 'Minas Gerais', value: 'mg', disabled: true },
];

describe('B2cDropdownComponent', () => {
  let fixture: ComponentFixture<B2cDropdownComponent>;
  let component: B2cDropdownComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cDropdownComponent, FormsModule, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cDropdownComponent);
    component = fixture.componentInstance;
    component.options = OPTIONS;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should start collapsed', () => expect(component.state).toBe('collapsed'));

  it('should expand on toggle()', () => {
    component.toggle();
    expect(component.state).toBe('expanded');
  });

  it('should collapse again on second toggle()', () => {
    component.toggle();
    component.toggle();
    expect(component.state).toBe('collapsed');
  });

  it('should not toggle when disabled', () => {
    component.disabled = true;
    component.toggle();
    expect(component.state).toBe('collapsed');
  });

  it('should select an option', () => {
    component.select(OPTIONS[0]);
    expect(component.value).toBe('sp');
    expect(component.state).toBe('collapsed');
  });

  it('should not select disabled option', () => {
    component.select(OPTIONS[2]);
    expect(component.value).toBe('');
  });

  it('should emit dropdownChange on selection', () => {
    const spy = jasmine.createSpy('dropdownChange');
    component.dropdownChange.subscribe(spy);
    component.select(OPTIONS[1]);
    expect(spy).toHaveBeenCalledWith('rj');
  });

  it('should return selected label', () => {
    component.value = 'rj';
    expect(component.selectedLabel).toBe('Rio de Janeiro');
  });

  it('should filter options when searchable=true', () => {
    component.searchable = true;
    component.searchQuery = 'paulo';
    const filtered = component.filteredOptions;
    expect(filtered.length).toBe(1);
    expect(filtered[0].value).toBe('sp');
  });

  it('should show all options when searchQuery is empty', () => {
    component.searchable = true;
    component.searchQuery = '';
    expect(component.filteredOptions.length).toBe(3);
  });

  it('should support CVA — writeValue', () => {
    component.writeValue('mg');
    expect(component.value).toBe('mg');
  });

  it('should collapse when clicking outside (document click)', () => {
    component.toggle();
    expect(component.state).toBe('expanded');
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: document.body });
    component.onOutsideClick(event);
    expect(component.state).toBe('collapsed');
  });
});
