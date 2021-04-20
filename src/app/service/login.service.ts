import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface CredentialsType {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private httpClient: HttpClient) { }

  postCredentials(
    credentials: CredentialsType
  ): Observable<{ token?: string }> {
    return this.httpClient.post(environment.server + '/api/login_check', credentials);
  }
}
