import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { B2cAvatarComponent } from './b2c-avatar.component';

describe('B2cAvatarComponent', () => {
  let fixture: ComponentFixture<B2cAvatarComponent>;
  let component: B2cAvatarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [B2cAvatarComponent, IonicModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(B2cAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  it('should apply size classes', () => {
    for (const size of ['sm', 'md', 'lg'] as const) {
      component.size = size;
      fixture.detectChanges();
      const el = fixture.debugElement.query(By.css('.b2c-avatar'));
      expect(el.nativeElement.className).toContain(`b2c-avatar--${size}`);
    }
  });

  it('should show image when src is set', () => {
    component.type = 'avatar';
    component.src = 'https://example.com/photo.jpg';
    fixture.detectChanges();
    const img = fixture.debugElement.query(By.css('.b2c-avatar__img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.src).toContain('photo.jpg');
  });

  it('should show initials when no src', () => {
    component.type = 'avatar';
    component.initials = 'AB';
    fixture.detectChanges();
    const span = fixture.debugElement.query(By.css('.b2c-avatar__initials'));
    expect(span).toBeTruthy();
    expect(span.nativeElement.textContent.trim()).toBe('AB');
  });

  it('should limit initials to 2 chars', () => {
    component.initials = 'João Silva';
    expect(component.fallbackInitials).toBe('JO');
  });

  it('should show ion-icon when type=icon', () => {
    component.type = 'icon';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.b2c-avatar__icon'));
    expect(icon).toBeTruthy();
  });

  it('should show user info when showUserInfo=true', () => {
    component.showUserInfo = true;
    component.userName = 'Ana Costa';
    component.userRole = 'Analista';
    fixture.detectChanges();
    const name = fixture.debugElement.query(By.css('.b2c-avatar__name'));
    const role = fixture.debugElement.query(By.css('.b2c-avatar__role'));
    expect(name.nativeElement.textContent.trim()).toBe('Ana Costa');
    expect(role.nativeElement.textContent.trim()).toBe('Analista');
  });
});
