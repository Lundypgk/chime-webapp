import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { GlobalVariable } from './../global';
import 'rxjs/add/operator/map';

@Injectable()
export class InstagramService {

  constructor(private http: Http) { }

  authenticate() {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    alert(GlobalVariable.serverUrl + '/instagram/authenticate');
    return this.http.get(GlobalVariable.serverUrl + '/instagram/authenticate')
      .map(res => res.json());
  }
}
