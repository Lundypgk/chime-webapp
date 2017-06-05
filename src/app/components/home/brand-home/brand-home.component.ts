import { Router } from '@angular/router';
import { BrandListingService } from '../../../services/brand-listing.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-home',
  templateUrl: './brand-home.component.html',
  styleUrls: ['./brand-home.component.css']
})
export class BrandHomeComponent implements OnInit {
  listings: any = [];
  jwt: String;
  busy: Subscription;

  constructor(private listingService: BrandListingService,
    private router: Router) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');
    this.busy = this.listingService.retrieveListing(this.jwt).subscribe(data => {
      if (data.success) {
        this.listings = data.results;
      }
      else {
        //No data
      }
    });
  }

  onListing(listing) {
    this.router.navigate(['brand/listing/:id'], { queryParams: { id: listing._id } });
  }

  onPayment() {
    this.router.navigate(['payment']);
  }
}
