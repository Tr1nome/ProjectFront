import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../service/login.service';

@Injectable({ providedIn: 'root' })
export class IsAdminGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: LoginService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUser;
        if (currentUser) {
          console.log("on passe par cette condition");
            // check if route is restricted by role
            if (route.data.admin && route.data.admin !== currentUser.username) {
                // role not authorised so redirect to home page
                console.log("impossible que ça ne marche pas");
                this.router.navigate(['/']);
                return false;
            }
 
            // authorised so return true
            return true;
        }
    }
}