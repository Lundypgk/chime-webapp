import { Router } from '@angular/router';
import { BrandListingService } from '../../../services/brand-listing.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-brand-home',
  templateUrl: './brand-home.component.html',
  styleUrls: ['./brand-home.component.css']
})
export class BrandHomeComponent implements OnInit {
  listings: any = [];
  jwt: String;
  busy: Subscription;
  // test:string;
  //store updates
  updates: any = {};
  editing: boolean = false;
  payment: boolean = false;
  display: boolean = false;


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

  toggleEdit() {
    this.editing = !this.editing;
  }

  editJob(perk, require, desc) {
    this.updates = this.listings[0];
    this.updates.jwt = this.jwt;
    this.updates.description = desc;
    this.updates.requirements = require;
    this.updates.perks = perk;
    console.log(this.updates);
    this.busy = this.listingService.UpdateListing(this.updates).subscribe(data => {
      if (data.success) {
        this.editing = !this.editing;
        location.reload();
      }
      else {
        //null
      }
    });
  }

  onListing(listing) {
    this.router.navigate(['brand/listing/:id'], { queryParams: { id: listing._id } });
  }

  onPayment() {
    // this.router.navigate(['payment']);
    this.payment = true;
  }

  showDialog() {
    this.display = true;
  }
}

