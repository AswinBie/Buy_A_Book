import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiurls } from '../api.urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  register(registerObj: any) {
    return this.http.post<any>(`${apiurls.authServiceApi}register`, registerObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${apiurls.authServiceApi}login`, loginObj);
  }
}
