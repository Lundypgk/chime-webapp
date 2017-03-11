import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class BrandListingService {
  listing : any;

  constructor(private http:Http) { }

  retrieveListing(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/listing/getAllListing',{ headers : headers})
      .map(res => res.json());
  }

  postListing(listing){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/listing/addListing',listing,{ headers : headers})
      .map(res => res.json());
  }
}
