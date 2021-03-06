import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
  token: string;
  username: string;
  created: string;
  secret: string;
  wsseToken: string;

  constructor() { }

  hasAuthorizationToken(): boolean {
    const hasToken = !!this.token;

    return hasToken;
  }

  getAuthorizationToken(): string {
    // Generate a new token with new nonce each time otherwise it's a replay attack
    const token = localStorage.getItem('id-token');
    this.token = token;
    return this.token;
  }

  setAuthorizationToken(token: string) {
    // Save static parts of the token
    this.token = token;
    localStorage.setItem('id-token', this.token);
  }

  cleanAuthorizationToken() {
    // Clean token informations
    this.token = null;
    localStorage.removeItem('id-token');
  }
}
