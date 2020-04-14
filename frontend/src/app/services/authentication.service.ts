import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  loginWithUsernameAndPassword$(username: string, password: string) {
    return this.httpClient.post('http://localhost:4200/login', {
      adminUsername: username,
      adminPassword: password,
    })
      .pipe(
        tap(res => localStorage.setItem('accessToken', res['token'])),
      )
      .subscribe()
  }

  logout() {
    return localStorage.removeItem('accessToken');
  }


}
