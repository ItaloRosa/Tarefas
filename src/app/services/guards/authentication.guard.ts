import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

export const AuthenticationGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return inject(UserService).authenticated
    ? true
    : inject(Router).createUrlTree(['/login']);
};
