import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from "@angular/http";
import { GlobalVariable } from './../global';
import 'rxjs/add/operator/map';

@Injectable()
export class ChimerListingService {

  constructor(private http: Http) { }

  retrieveListing(jwt) {
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    headers.append('Content-Type', 'application/json');
    params.set('jwt', jwt);
    return this.http.get(GlobalVariable.serverUrl + '/chimer-listing/getAllListing'
      , {
        headers: headers,
        search: params
      })
      .map(res => res.json());
  }

  applyListing(jwt) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(GlobalVariable.serverUrl + '/chimer-listing/applyListing', jwt)
      .map(res => res.json());
  }

  retrieveChimerDetail(jwt) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params: URLSearchParams = new URLSearchParams();
    params.set('jwt', jwt);
    return this.http.get(GlobalVariable.serverUrl + '/chimer-listing/retrieveChimerDetail',
      {
        headers: headers,
        search: params
      })
      .map(res => res.json());
  }



  getCurrentJob(jwt) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let params: URLSearchParams = new URLSearchParams();
    params.set('jwt', jwt);
    return this.http.get(GlobalVariable.serverUrl + '/chimer-listing/getCurrentJob',
      {
        headers: headers,
        search: params
      })
      .map(res => res.json());
  }

  updateCurrentJob(job) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(GlobalVariable.serverUrl + '/chimer-listing/updateCurrentJob', job, { headers: headers })
      .map(res => res.json());
  }

  updateProfile(profile) {
     let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(GlobalVariable.serverUrl + '/chimer-listing/updateProfile', profile, { headers: headers })
      .map(res => res.json());
  }

  logOut() {
    return this.http.get(GlobalVariable.serverUrl + '/login/logout')
      .map(res => res.json());
  }

}