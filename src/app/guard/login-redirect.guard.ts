import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "app/services/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginRedirectGuard implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let jwt = { 'jwt': localStorage.getItem('wearechime') };
        return this.authService.isUserLoggedIn(jwt).map(data => {
            if (data.result && data.isChimer) {
                this.router.navigate(['/chimer']);
            }
            else if (data.result && !data.isChimer) {
                this.router.navigate(['/brand']);
            }
            return true;
        })
    }
}