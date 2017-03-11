import { ListingService } from './../../services/listing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listings : any = [];

  constructor(private listingService : ListingService) { }

  ngOnInit() {
    this.listingService.retrieveListing().subscribe(data => {
          if(data.success){
            this.listings = data.results;
          }
          else{
          }
       });
  }

  onCampaign(listing){
    alert(listing._id);
  }

}
