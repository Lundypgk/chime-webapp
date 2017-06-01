import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { GlobalVariable } from './../global';
import 'rxjs/add/operator/map';

@Injectable()
export class PaymentService {

    constructor(private http: Http) { }

    retrieveToken() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.get(GlobalVariable.serverUrl + '/payment/client-token')
            .map(res => res.json());
    };

    checkOut(nonce) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(GlobalVariable.serverUrl + '/payment/checkout', nonce)
            .map(res => res.json());
    };
}