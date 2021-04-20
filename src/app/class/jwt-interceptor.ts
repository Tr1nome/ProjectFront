import { TokenServiceService } from '../service/token-service.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.tokenService.getAuthorizationToken();

    if (authToken) {
      // Clone the request and replace the original headers with
      // cloned headers, updated with the authorization.
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      // send cloned request with header to the next handler.
      return next.handle(authReq);
    } else {
      // otherwise send request without token
      return next.handle(req);
    }
  }
}