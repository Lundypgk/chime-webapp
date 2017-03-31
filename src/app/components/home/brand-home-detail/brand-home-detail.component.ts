import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import { BrandListingService } from '../../../services/brand-listing.service';

@Component({
  selector: 'app-brand-home-detail',
  templateUrl: './brand-home-detail.component.html',
  styleUrls: ['./brand-home-detail.component.css']
})
export class BrandHomeDetailComponent implements OnInit {
  id : any;
  campaignDetails = [];

  constructor(private listingService : BrandListingService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
        .queryParams
        .subscribe(params => {
            this.id = params['id'];
        });
    this.listingService.getCampaignDetail(this.id).subscribe(data => {
          if(data.success){
            this.campaignDetails = data.result;
          }
          else{
            //No data
          }
       });
  }

  onApprove(data){
    this.listingService.updateStatus(data).subscribe(data => {
          if(data.success){
            alert("Success");
            location.reload();
          }
          else{
            //No data
          }
       });
  }
}
