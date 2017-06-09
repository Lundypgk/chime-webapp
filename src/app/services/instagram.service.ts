import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { GlobalVariable } from './../global';
import 'rxjs/add/operator/map';

@Injectable()
export class InstagramService {

  constructor(private http: Http) { }

  authenticate() {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.get(GlobalVariable.serverUrl + '/instagram/authenticate')
      .map(res => res.json());
  }

  accessToken(code) {
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    headers.append('Content-Type', 'application/json');
    params.set('code', code);
    return this.http.get(GlobalVariable.serverUrl + '/instagram/accessToken', {
      headers: headers,
      search: params
    })
      .map(res => res.json());
  }
}
