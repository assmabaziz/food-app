import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor() {
    if (localStorage.getItem('userToken')) {
      this.getProfile();
    }
  }
  private readonly _HttpClient = inject(HttpClient);
  role: string | null = '';
  loginUser(userData: object): Observable<any> {
    return this._HttpClient.post(`Users/Login`, userData);
  }
  verifyUserEmail(userData: string) {
    return this._HttpClient.put(`Users/verify`, userData);
  }
  registerUser(userInfo: object): Observable<any> {
    return this._HttpClient.post(`Users/Register`, userInfo);
  }
  requestResetPassword(data: object) {
    return this._HttpClient.post(`Users/Reset/Request`, data);
  }
  resetPassword(data: object) {
    return this._HttpClient.post(`Users/Reset`, data);
  }
  uppdateUserPassword(userData: object) {
    return this._HttpClient.put('Users/ChangePassword', userData);
  }
  getProfile() {
    let finalToken: any = localStorage.getItem('userToken');
    let decodedToken: any = jwtDecode(finalToken);
    localStorage.setItem('userName', decodedToken.userName);
    localStorage.setItem('userGroup', decodedToken.userGroup);
    localStorage.setItem('userEmail', decodedToken.userEmail);
    localStorage.setItem('userId', decodedToken.userId);
    this.setRole();
  }
  setRole(): any {
    if (
      localStorage.getItem('userToken') &&
      localStorage.getItem('userGroup')
    ) {
      this.role = localStorage.getItem('userGroup');
    }
  }
}
