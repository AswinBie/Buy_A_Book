import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiurls } from '../api.urls';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  register(registerObj: any) {
    return this.http.post<any>(`${apiurls.authServiceApi}register`, registerObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${apiurls.authServiceApi}login`, loginObj);
  }

  sendEmail(email: string) {
    return this.http.post<any>(`${apiurls.authServiceApi}send-email`, { email: email });
  }

  resetPassword(resetObj: any) {
    return this.http.post<any>(`${apiurls.authServiceApi}reset-password`, resetObj);
  }

  isLoggedIn() {
    return !!localStorage.getItem('user_id');
  }
}
