import { TestBed } from '@angular/core/testing';
import { DiagnosticService } from './diagnostic.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DiagnosticService', () => {
  let service: DiagnosticService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiagnosticService]
    });
    service = TestBed.inject(DiagnosticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
