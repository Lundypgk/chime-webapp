import {Injectable} from '@angular/core';
import {Http, Headers , URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class ChimerListingService {

  constructor(private http:Http) { }

  retrieveListing(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/chimer-listing/getAllListing',{ headers : headers})
      .map(res => res.json());
  }

  applyListing(jobId){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.post('http://localhost:3000/chimer-listing/applyListing', jobId)
    .map(res => res.json());
  }

  getCurrentJob(chimerId){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  let params: URLSearchParams = new URLSearchParams();
  params.set('chimerId', chimerId);
  return this.http.get('http://localhost:3000/chimer-listing/getCurrentJob',
                      { headers : headers,
                        search : params })
    .map(res => res.json());
  }

  updateCurrentJob(job){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.put('http://localhost:3000/chimer-listing/updateCurrentJob', job , { headers : headers})
    .map(res => res.json());
  }

  logOut(){
    return this.http.get('http://localhost:3000/login/logout')
      .map(res => res.json());
  }
  
}