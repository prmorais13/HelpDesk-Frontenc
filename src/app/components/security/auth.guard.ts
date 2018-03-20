import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { SharedService } from '../../services/shared.service';

@Injectable()
export class AuthGuard implements CanActivate {

  shared: SharedService;

  constructor(
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (this.shared.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
