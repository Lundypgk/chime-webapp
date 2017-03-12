import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChimerListingService } from '../../../services/chimer-listing.service';

@Component({
  selector: 'app-chimer-home',
  templateUrl: './chimer-home.component.html',
  styleUrls: ['./chimer-home.component.css']
})
export class ChimerHomeComponent implements OnInit {
  listings : any = [];

  constructor(private listingService : ChimerListingService,
              private router : Router) { }

  ngOnInit() {
    this.listingService.retrieveListing().subscribe(data => {
          if(data.success){
            this.listings = data.results;
          }
          else{
            //No data
          }
       });
  }

}
