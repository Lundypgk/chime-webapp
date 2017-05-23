import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { GlobalVariable } from './../global';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    isUserLoggedIn(jwt) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(GlobalVariable.serverUrl + '/auth/isUserLoggedIn', jwt, { headers: headers })
            .map(res => res.json());
    }
}
