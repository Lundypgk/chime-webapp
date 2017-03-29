import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
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

  getCurrentJob(){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.get('http://localhost:3000/chimer-listing/getCurrentJob',{ headers : headers})
    .map(res => res.json());
  }

  updateCurrentJob(job){
  let headers = new Headers();
  headers.append('Content-Type','application/json');
  return this.http.put('http://localhost:3000/chimer-listing/updateCurrentJob', job , { headers : headers})
    .map(res => res.json());
  }

}