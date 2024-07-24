import { TestBed } from '@angular/core/testing';

import { HydroService } from './hydro.service';

describe('HydroService', () => {
  let service: HydroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HydroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
