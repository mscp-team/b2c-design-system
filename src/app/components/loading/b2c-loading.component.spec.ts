import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { B2cLoadingComponent } from './b2c-loading.component';

describe('B2cLoadingComponent', () => {
  let fixture: ComponentFixture<B2cLoadingComponent>;
  let component: B2cLoadingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cLoadingComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should render spinner by default', () => {
    const spinner = fixture.debugElement.query(By.css('.b2c-loading__spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should render bar when type=bar', () => {
    component.type = 'bar';
    fixture.detectChanges();
    const bar = fixture.debugElement.query(By.css('.b2c-loading__bar-track'));
    expect(bar).toBeTruthy();
  });

  it('should render pointer when type=pointer', () => {
    component.type = 'pointer';
    fixture.detectChanges();
    const pointer = fixture.debugElement.query(By.css('.b2c-loading__pointer'));
    expect(pointer).toBeTruthy();
  });

  it('should apply overlay class when overlay=true', () => {
    component.overlay = true;
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css('.b2c-loading'));
    expect(el.nativeElement.className).toContain('b2c-loading--overlay');
  });

  it('should have aria-busy=true', () => {
    const el = fixture.debugElement.query(By.css('.b2c-loading'));
    expect(el.nativeElement.getAttribute('aria-busy')).toBe('true');
  });

  it('should render 3 balls for spinner', () => {
    component.type = 'spinner';
    fixture.detectChanges();
    const balls = fixture.debugElement.queryAll(By.css('.b2c-loading__ball'));
    expect(balls.length).toBe(3);
  });
});
