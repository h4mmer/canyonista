import { TestBed } from '@angular/core/testing';

import { CanyonService } from './canyon.service';

describe('CanyonService', () => {
  let service: CanyonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanyonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
