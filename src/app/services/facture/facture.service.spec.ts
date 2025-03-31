import { TestBed } from '@angular/core/testing';
import { FactureService } from './facture.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FactureService', () => {
  let service: FactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FactureService]
    });
    service = TestBed.inject(FactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
