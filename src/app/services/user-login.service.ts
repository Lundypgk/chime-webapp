import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class UserLoginService {

  constructor(private http : Http) { }

  brandLogin(credentials){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    // return this.http.post('https://wearechime.herokuapp.com/login/brand',credentials,{ headers : headers})
    //   .map(res => res.json());
    return this.http.post('http://localhost:3000/login/brand',credentials,{ headers : headers})
    .map(res => res.json());
  }

  chimerLogin(credentials){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/login/chimer',credentials,{ headers : headers})
    .map(res => res.json());
  
    // return this.http.post('https://wearechime.herokuapp.com/login/chimer',credentials,{ headers : headers})
    // .map(res => res.json());
  }
}
