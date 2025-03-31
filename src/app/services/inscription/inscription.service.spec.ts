import { TestBed } from '@angular/core/testing';
import { InscriptionService } from './inscription.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InscriptionService', () => {
  let service: InscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InscriptionService]
    });
    service = TestBed.inject(InscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
