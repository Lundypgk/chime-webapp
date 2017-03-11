import { Router } from '@angular/router';
import { BrandListingService } from './../../services/brand-listing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-home',
  templateUrl: './brand-home.component.html',
  styleUrls: ['./brand-home.component.css']
})
export class BrandHomeComponent implements OnInit {
  listings : any = [];

  constructor(private listingService : BrandListingService,
              private router : Router) { }

  ngOnInit() {
    this.listingService.retrieveListing().subscribe(data => {
          if(data.success){
            this.listings = data.results;
          }
          else{
          }
       });
  }

  onListing(listing){
    this.router.navigate(['listing/:id']
    ,{queryParams: 
      {
        id: listing._id,
    }});
  }

}
