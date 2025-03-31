import { TestBed } from '@angular/core/testing';
import { CategorieService } from './categorie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CategorieService', () => {
  let service: CategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategorieService]
    });
    service = TestBed.inject(CategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
