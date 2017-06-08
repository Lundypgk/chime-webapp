import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { GlobalVariable } from './../global';

@Injectable()
export class InstagramService {

  constructor(private http: Http) { }

  authenticate() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(GlobalVariable.serverUrl + '/instagram/authenticate', {
      headers: headers
    })
      .map(res => res.json());
  }
}
