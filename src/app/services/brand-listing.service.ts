import {Injectable} from '@angular/core';
import {Http, Headers , URLSearchParams } from "@angular/http";
import { GlobalVariable } from './../global';
import 'rxjs/add/operator/map';

@Injectable()
export class BrandListingService {
  listing : any;
  listingId : any;

  constructor(private http:Http) { }

  retrieveListing(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get(GlobalVariable.serverUrl + '/brand-listing/getAllListing',{ headers : headers})
      .map(res => res.json());
  }

  postListing(listing){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(GlobalVariable.serverUrl + '/brand-listing/addListing',listing,{ headers : headers})
      .map(res => res.json());
  }

  getCampaignDetail(listingId){
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set('listingId', listingId);
    headers.append('Content-Type','application/json');
    return this.http.get(GlobalVariable.serverUrl + '/brand-listing/getCampaginDetails'
                        ,{ headers : headers,
                          search : params })
      .map(res => res.json());
    }

  updateStatus(data){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put(GlobalVariable.serverUrl + '/brand-listing/updateStatus', data , { headers : headers})
      .map(res => res.json());
  }
}
