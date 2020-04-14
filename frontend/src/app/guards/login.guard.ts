import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {AuthenticationService} from '../services/authentication.service';
import {UserAuthModel} from '../models/user-auth.model';

/*
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userAuthModel: UserAuthModel,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = localStorage.getItem('access_token');
    let subject = new Subject<boolean>();

    if (token) {
      console.log('True =====> Get token');
      this.authenticationService.loginWithUsernameAndPassword(this.userAuthModel.username, this.userAuthModel.password);
      this.router.navigate(['/']);
      subject.next(true);
      return true;
    } else {
      console.log('=====> No token');
      this.authenticationService.logout();
      this.router.navigate(['/login']);
      subject.next(false);
      return false;
    }
  }
}
*/
