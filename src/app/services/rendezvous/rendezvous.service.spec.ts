import { TestBed } from '@angular/core/testing';
import { RendezVousService } from './rendezvous.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RendezVousService', () => {
  let service: RendezVousService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RendezVousService]
    });
    service = TestBed.inject(RendezVousService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
