import { TestBed } from '@angular/core/testing';

import { CdcService } from './cdc.service';

describe('CdcService', () => {
  let service: CdcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
