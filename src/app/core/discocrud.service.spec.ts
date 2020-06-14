import { TestBed } from '@angular/core/testing';

import { discocrudService } from './discocrud.service';

describe('discocrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: discocrudService = TestBed.get(discocrudService);
    expect(service).toBeTruthy();
  });
});