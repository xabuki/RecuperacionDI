import { TestBed } from '@angular/core/testing';

import { DiscotecadbService } from './discotecadbservice.service';

describe('DiscotecadbserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscotecadbService = TestBed.get(DiscotecadbService);
    expect(service).toBeTruthy();
  });
});
