import { Router } from '@angular/router';
import { BrandListingService } from '../../../services/brand-listing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ng2DynamicDialogComponent } from 'ng2-dynamic-dialog';
import { Ng2DynamicDialogContent } from 'ng2-dynamic-dialog';
import { Ng2DynamicDialogStyle } from 'ng2-dynamic-dialog';
import { PaymentComponent } from "app/components/home/payment/payment.component";

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

  @ViewChild(Ng2DynamicDialogComponent)
  private modalDialog: Ng2DynamicDialogComponent;

  constructor(private listingService: BrandListingService,
    private router: Router) {
  }

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
    let dialogStyle = new Ng2DynamicDialogStyle();
    dialogStyle.background = 'ng2-dynamic-dialog-background';
    dialogStyle.dialog = 'ng2-dynamic-dialog-dialogBox';
    dialogStyle.title = 'ng2-dynamic-dialog-samples-custom-style-title';
    // Set it
    this.modalDialog.setStyle(dialogStyle);

    // Set the content
    let dialogContent = new Ng2DynamicDialogContent();
    dialogContent.title = 'Payment';
    dialogContent.height = 800;
    dialogContent.width = 800;

    // Pass through the type of component you wish to be rendered inside the dialog
    dialogContent.componentContent = PaymentComponent;

    this.modalDialog.show(dialogContent);
  }
}

