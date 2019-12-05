import { TestBed } from '@angular/core/testing';

import { NGXCookieAPIService } from './ngxcookie-api.service';

describe('NGXCookieAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NGXCookieAPIService = TestBed.get(NGXCookieAPIService);
    expect(service).toBeTruthy();
  });
});
