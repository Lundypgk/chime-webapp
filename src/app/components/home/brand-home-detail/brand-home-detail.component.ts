import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BrandListingService } from '../../../services/brand-listing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-home-detail',
  templateUrl: './brand-home-detail.component.html',
  styleUrls: ['./brand-home-detail.component.css']
})
export class BrandHomeDetailComponent implements OnInit {
  id: any;
  campaignDetails = [];
  busy: Subscription;
  jwt: String;

  constructor(private listingService: BrandListingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');
    this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'];
      });
    this.busy = this.listingService.getCampaignDetail(this.id, this.jwt).subscribe(data => {
      if (data.success) {
        this.campaignDetails = data.result;
      }
      else {
        //No data
      }
    });
  }

  onApprove(data) {
    this.listingService.updateStatus(data, this.jwt).subscribe(data => {
      if (data.success) {
        alert("Success");
        location.reload();
      }
      else {
        //No data
      }
    });
  }
}
