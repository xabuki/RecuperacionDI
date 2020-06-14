import { TestBed } from '@angular/core/testing';

import { DiscodbService } from './discodb.service';

describe('DiscodbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscodbService = TestBed.get(DiscodbService);
    expect(service).toBeTruthy();
  });
});
