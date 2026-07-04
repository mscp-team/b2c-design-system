import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  B2cComponentsService,
  ApiResponse,
  FormFieldOption,
  BadgeToneConfig,
} from './b2c-components.service';

// ── helpers ──────────────────────────────────────────────────────────────────

function ok<T>(data: T): ApiResponse<T> {
  return { data, statusCode: 200 };
}

// ── suite ────────────────────────────────────────────────────────────────────

describe('B2cComponentsService', () => {
  let service: B2cComponentsService;
  let http: HttpTestingController;
  const BASE = '/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [B2cComponentsService],
    });
    service = TestBed.inject(B2cComponentsService);
    http    = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify()); // assert no pending requests

  // ── Button ─────────────────────────────────────────────────────────────────

  describe('triggerButtonAction()', () => {
    it('should POST to /api/buttons/:id/action', () => {
      service.triggerButtonAction('btn-1', { label: 'click' }).subscribe();
      const req = http.expectOne(`${BASE}/buttons/btn-1/action`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ label: 'click' });
      req.flush(ok(undefined));
    });
  });

  // ── Badge ──────────────────────────────────────────────────────────────────

  describe('getBadgeConfig()', () => {
    it('should GET /api/badges/:id', () => {
      const mockConfig: BadgeToneConfig = { tone: 'success', label: 'Ativo' };
      service.getBadgeConfig('badge-1').subscribe((res) => {
        expect(res.data).toEqual(mockConfig);
      });
      const req = http.expectOne(`${BASE}/badges/badge-1`);
      expect(req.request.method).toBe('GET');
      req.flush(ok(mockConfig));
    });
  });

  // ── Chip ───────────────────────────────────────────────────────────────────

  describe('getChipOptions()', () => {
    it('should GET /api/chips?category=X', () => {
      const chips = [{ label: 'São Paulo', value: 'sp', icon: '' }];
      service.getChipOptions('estado').subscribe((res) => {
        expect(res.data.length).toBe(1);
        expect(res.data[0].value).toBe('sp');
      });
      const req = http.expectOne((r) =>
        r.url === `${BASE}/chips` && r.params.get('category') === 'estado'
      );
      expect(req.request.method).toBe('GET');
      req.flush(ok(chips));
    });
  });

  // ── Toggle ─────────────────────────────────────────────────────────────────

  describe('saveToggleState()', () => {
    it('should PUT /api/preferences/:key with enabled payload', () => {
      service.saveToggleState('dark-mode', true).subscribe();
      const req = http.expectOne(`${BASE}/preferences/dark-mode`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ enabled: true });
      req.flush(ok(undefined));
    });
  });

  describe('getToggleState()', () => {
    it('should GET /api/preferences/:key', () => {
      service.getToggleState('notifications').subscribe((res) => {
        expect(res.data.enabled).toBeTrue();
      });
      const req = http.expectOne(`${BASE}/preferences/notifications`);
      expect(req.request.method).toBe('GET');
      req.flush(ok({ enabled: true }));
    });
  });

  // ── Checkbox ───────────────────────────────────────────────────────────────

  describe('saveCheckboxSelections()', () => {
    it('should PUT /api/checkboxes/:groupId with values array', () => {
      service.saveCheckboxSelections('terms', ['accept-all']).subscribe();
      const req = http.expectOne(`${BASE}/checkboxes/terms`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ values: ['accept-all'] });
      req.flush(ok(undefined));
    });
  });

  // ── Form Field ─────────────────────────────────────────────────────────────

  describe('getSelectOptions()', () => {
    it('should GET /api/:endpoint/options', () => {
      const opts: FormFieldOption[] = [
        { label: 'Opção 1', value: '1' },
        { label: 'Opção 2', value: '2' },
      ];
      service.getSelectOptions('states').subscribe((res) => {
        expect(res.data).toEqual(opts);
      });
      const req = http.expectOne(`${BASE}/states/options`);
      expect(req.request.method).toBe('GET');
      req.flush(ok(opts));
    });
  });

  describe('uploadFile()', () => {
    it('should POST FormData to /api/:endpoint/upload', () => {
      const file = new File(['content'], 'doc.pdf', { type: 'application/pdf' });
      service.uploadFile(file, 'documents').subscribe((res) => {
        expect(res.data.fileName).toBe('doc.pdf');
      });
      const req = http.expectOne(`${BASE}/documents/upload`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body instanceof FormData).toBeTrue();
      const fd = req.request.body as FormData;
      expect((fd.get('file') as File).name).toBe('doc.pdf');
      req.flush(ok({ url: 'https://cdn.example.com/doc.pdf', fileName: 'doc.pdf' }));
    });
  });

  describe('submitForm()', () => {
    it('should POST payload to /api/:endpoint', () => {
      const payload = { name: 'Ana', email: 'ana@test.com' };
      service.submitForm('contact', payload).subscribe((res) => {
        expect(res.data).toEqual(payload);
      });
      const req = http.expectOne(`${BASE}/contact`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(ok(payload));
    });
  });

  describe('validateField()', () => {
    it('should POST to /api/validate with field and value', () => {
      service.validateField('email', 'ana@test.com').subscribe((res) => {
        expect(res.data.valid).toBeTrue();
      });
      const req = http.expectOne(`${BASE}/validate`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ field: 'email', value: 'ana@test.com' });
      req.flush(ok({ valid: true }));
    });

    it('should return validation error message when invalid', () => {
      service.validateField('email', 'nao-e-email').subscribe((res) => {
        expect(res.data.valid).toBeFalse();
        expect(res.data.message).toBe('Email inválido');
      });
      const req = http.expectOne(`${BASE}/validate`);
      req.flush(ok({ valid: false, message: 'Email inválido' }));
    });
  });

  // ── Counter ────────────────────────────────────────────────────────────────

  describe('saveCounterValue()', () => {
    it('should PUT /api/counters/:key with value', () => {
      service.saveCounterValue('passengers', 3).subscribe();
      const req = http.expectOne(`${BASE}/counters/passengers`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ value: 3 });
      req.flush(ok(undefined));
    });
  });

  // ── Dropdown ───────────────────────────────────────────────────────────────

  describe('getDropdownOptions()', () => {
    it('should GET /api/:resource/options without params', () => {
      service.getDropdownOptions('cities').subscribe();
      const req = http.expectOne(`${BASE}/cities/options`);
      expect(req.request.method).toBe('GET');
      req.flush(ok([]));
    });

    it('should pass query params when provided', () => {
      service.getDropdownOptions('cities', { state: 'SP' }).subscribe();
      const req = http.expectOne((r) =>
        r.url === `${BASE}/cities/options` && r.params.get('state') === 'SP'
      );
      req.flush(ok([]));
    });
  });

  // ── Date Picker ────────────────────────────────────────────────────────────

  describe('getUnavailableDates()', () => {
    it('should GET /api/calendars/:id/unavailable', () => {
      const dates = ['2024-12-25', '2024-01-01'];
      service.getUnavailableDates('calendar-main').subscribe((res) => {
        expect(res.data).toEqual(dates);
      });
      const req = http.expectOne(`${BASE}/calendars/calendar-main/unavailable`);
      expect(req.request.method).toBe('GET');
      req.flush(ok(dates));
    });
  });

  // ── Tiles ──────────────────────────────────────────────────────────────────

  describe('getTiles()', () => {
    it('should GET /api/tiles?section=X', () => {
      const tiles = [{ label: 'Extrato', icon: 'document-text' }];
      service.getTiles('dashboard').subscribe((res) => {
        expect(res.data[0].label).toBe('Extrato');
      });
      const req = http.expectOne((r) =>
        r.url === `${BASE}/tiles` && r.params.get('section') === 'dashboard'
      );
      expect(req.request.method).toBe('GET');
      req.flush(ok(tiles));
    });
  });

  // ── Pagination ─────────────────────────────────────────────────────────────

  describe('getPaginatedList()', () => {
    it('should GET /api/:endpoint with page and pageSize params', () => {
      const mockResult = { items: [{ id: 1 }], total: 50, page: 2, pageSize: 10 };
      service.getPaginatedList<{ id: number }>('plans', 2, 10).subscribe((res) => {
        expect(res.data.total).toBe(50);
        expect(res.data.page).toBe(2);
      });
      const req = http.expectOne((r) =>
        r.url === `${BASE}/plans` &&
        r.params.get('page') === '2' &&
        r.params.get('pageSize') === '10'
      );
      expect(req.request.method).toBe('GET');
      req.flush(ok(mockResult));
    });

    it('should default pageSize to 10', () => {
      service.getPaginatedList('items', 1).subscribe();
      const req = http.expectOne((r) =>
        r.url === `${BASE}/items` && r.params.get('pageSize') === '10'
      );
      req.flush(ok({ items: [], total: 0, page: 1, pageSize: 10 }));
    });
  });

  // ── Dialog / Alert / Toast ─────────────────────────────────────────────────

  describe('logUserFeedback()', () => {
    it('should POST to /api/feedback/log', () => {
      service.logUserFeedback('dialog', 'confirmed', { id: 'dlg-1' }).subscribe();
      const req = http.expectOne(`${BASE}/feedback/log`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        type: 'dialog',
        action: 'confirmed',
        meta: { id: 'dlg-1' },
      });
      req.flush(ok(undefined));
    });

    it('should work without meta', () => {
      service.logUserFeedback('toast', 'dismissed').subscribe();
      const req = http.expectOne(`${BASE}/feedback/log`);
      expect(req.request.body.meta).toBeUndefined();
      req.flush(ok(undefined));
    });
  });

  // ── Progress Bar ───────────────────────────────────────────────────────────

  describe('getProgress()', () => {
    it('should GET /api/tasks/:id/progress', () => {
      service.getProgress('task-abc').subscribe((res) => {
        expect(res.data.value).toBe(75);
        expect(res.data.label).toBe('Processando...');
      });
      const req = http.expectOne(`${BASE}/tasks/task-abc/progress`);
      expect(req.request.method).toBe('GET');
      req.flush(ok({ value: 75, label: 'Processando...' }));
    });
  });

  // ── Status Indicator ───────────────────────────────────────────────────────

  describe('getSystemStatus()', () => {
    it('should GET /api/status', () => {
      const statuses = [
        { service: 'auth', status: 'success' },
        { service: 'payments', status: 'warning' },
      ];
      service.getSystemStatus().subscribe((res) => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].service).toBe('auth');
      });
      const req = http.expectOne(`${BASE}/status`);
      expect(req.request.method).toBe('GET');
      req.flush(ok(statuses));
    });
  });

  // ── Navbar ─────────────────────────────────────────────────────────────────

  describe('searchGlobal()', () => {
    it('should GET /api/search?q=:query', () => {
      const results = [{ label: 'Planos', route: '/plans', type: 'page' }];
      service.searchGlobal('planos').subscribe((res) => {
        expect(res.data[0].route).toBe('/plans');
      });
      const req = http.expectOne((r) =>
        r.url === `${BASE}/search` && r.params.get('q') === 'planos'
      );
      expect(req.request.method).toBe('GET');
      req.flush(ok(results));
    });
  });

  describe('logout()', () => {
    it('should POST to /api/auth/logout', () => {
      service.logout().subscribe();
      const req = http.expectOne(`${BASE}/auth/logout`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({});
      req.flush(ok(undefined));
    });
  });

  // ── Error handling ─────────────────────────────────────────────────────────

  describe('HTTP error handling', () => {
    it('should propagate 401 errors', () => {
      let errorStatus = 0;
      service.getSystemStatus().subscribe({
        error: (err) => { errorStatus = err.status; },
      });
      const req = http.expectOne(`${BASE}/status`);
      req.flush('Não autorizado', { status: 401, statusText: 'Unauthorized' });
      expect(errorStatus).toBe(401);
    });

    it('should propagate 500 errors', () => {
      let errorStatus = 0;
      service.submitForm('contact', {}).subscribe({
        error: (err) => { errorStatus = err.status; },
      });
      const req = http.expectOne(`${BASE}/contact`);
      req.flush('Erro interno', { status: 500, statusText: 'Server Error' });
      expect(errorStatus).toBe(500);
    });

    it('should propagate 422 validation errors', () => {
      let errorBody: unknown;
      service.validateField('cpf', '000').subscribe({
        error: (err) => { errorBody = err.error; },
      });
      const req = http.expectOne(`${BASE}/validate`);
      req.flush({ message: 'CPF inválido' }, { status: 422, statusText: 'Unprocessable' });
      expect(errorBody).toEqual({ message: 'CPF inválido' });
    });
  });
});
