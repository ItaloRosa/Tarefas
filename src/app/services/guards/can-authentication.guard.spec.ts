import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAuthenticationGuard } from './can-authentication.guard';

describe('canAuthenticationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canAuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
