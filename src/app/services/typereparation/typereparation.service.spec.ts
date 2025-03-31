import { TestBed } from '@angular/core/testing';

import { TypereparationService } from './typereparation.service';

describe('TypereparationService', () => {
  let service: TypereparationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypereparationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
