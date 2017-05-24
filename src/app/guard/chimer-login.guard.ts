import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "app/services/auth.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ChimerLoginGuard implements CanActivate {

    constructor(private _service: NotificationsService,
        private router: Router,
        private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let jwt = { 'jwt': localStorage.getItem('wearechime') };
        return this.authService.isUserLoggedIn(jwt).map(data => {
            if (!data.result || !data.isChimer) {
                this._service.error(
                    'Error',
                    'Please login first',
                    {
                        timeOut: 3000,
                        pauseOnHover: false,
                        clickToClose: true
                    }
                )
                this.router.navigate(['/']);
            }
            return data.result;
        })
    }
}