import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RssFeedService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  apiGetRequest$(): Observable<Object> {
    return this.httpClient.get('http://localhost:3000/');
  }
}
