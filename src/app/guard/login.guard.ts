import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "app/services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private _service: NotificationsService,
        private router: Router,
        private authService: AuthService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(state)
        return this.checkIfLoggedIn();
    }

    private checkIfLoggedIn(): boolean {

        // let loggedIn: boolean = Math.random() < 0.5;
        let loggedIn: boolean;
        let jwt = { 'jwt': localStorage.getItem('wearechime') };
        if (!jwt) {
            this._service.error(
                'Error',
                'Please login',
                {
                    timeOut: 3000,
                    pauseOnHover: false,
                    clickToClose: true
                }
            )
            this.router.navigate(['/']);
        }
        else {
            this.authService.isUserLoggedIn(jwt).subscribe(data => {
                if (data.result) {
                    loggedIn = true;
                    console.log("pass")
                }
                else {
                    console.log("fail");
                    loggedIn = false;
                    this.router.navigate(['/']);
                }
            });
        }

        // if (!loggedIn) {
        //     console.log("LoginGuard: The user is not logged in and can't navigate to product details");
        //     this._service.error(
        //         'Error',
        //         'Please login',
        //         {
        //             timeOut: 3000,
        //             pauseOnHover: false,
        //             clickToClose: true
        //         }
        //     )
        //     this.router.navigate(['/']);
        // }
        return loggedIn;
    }
}