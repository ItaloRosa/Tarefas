import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

//TODO: Verificar implementação do guard para Angular 17

@Injectable({
  providedIn: 'root'
})
export class CanAuthenticationGuard implements CanActivate {
  constructor(
    protected userService: UserService,
    protected router: Router
  ) {}

  canActivate(route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.userService.logado) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
