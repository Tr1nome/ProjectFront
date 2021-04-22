import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Login } from '../class/login';
import { User } from '../class/user';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Globals } from '../globals';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginSubject: BehaviorSubject<Login> ;
  private loginObs: Observable<Login>;

  private userSubject: BehaviorSubject<User>;
  private userObs: Observable<User>;
  
  constructor(private httpClient: HttpClient) {
    const token = JSON.parse(localStorage.getItem(Globals.APP_USER_TOKEN));
    this.loginSubject = new BehaviorSubject<Login>(token);
    this.loginObs = this.loginSubject.asObservable();

    const user = JSON.parse(localStorage.getItem(Globals.APP_USER));
    this.userSubject = new BehaviorSubject<User>(user);
    this.userObs = this.userSubject.asObservable();
   }

  postCredentials(username: string, password: string) {
    return this.httpClient.post<Login>(environment.server + '/api/login_check', {username, password })
    .pipe(map( (data) => {
      if (data && data.token) {
        console.log(data);
        localStorage.setItem(Globals.APP_USER_TOKEN, JSON.stringify(data));
        this.loginSubject.next(data);
      }
      return data;
    } ));
  }

  public get tokenData() {
    return JSON.parse(localStorage.getItem(Globals.APP_USER_TOKEN));
  }

  public isConnected(): boolean {
    return !!this.loginSubject.value && !!this.userSubject.value;
  }


  public logout() {
    console.log('logging out');
    localStorage.removeItem(Globals.APP_USER_TOKEN);
    localStorage.removeItem(Globals.APP_USER);
    this.loginSubject.next(null);
    this.userSubject.next(null);
  }
  
  public isAdmin() : boolean {
    return this.currentUser.roles === ["ROLE_ADMIN", "ROLE_USER"];
  }
  public get currentUser(): User|null {
    return this.userSubject.value;
  }

  public get currentUsername(): string {
    return this.currentUser.username;
  }

  public profile() {
    return this.httpClient.get<User>(environment.server + '/auth/profile', {})
    .pipe(map( (user) => {
      console.log(user);
      if (user) {
        localStorage.setItem(Globals.APP_USER, JSON.stringify(user));
        this.userSubject.next(user);
        this.userObs = this.userSubject.asObservable();
      }
      return this.userSubject.value;
    } ));
  }

}
