import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChimerListingService } from '../../../services/chimer-listing.service';

@Component({
  selector: 'app-chimer-home',
  templateUrl: './chimer-home.component.html',
  styleUrls: ['./chimer-home.component.css']
})
export class ChimerHomeComponent implements OnInit {
  allListing : any = [];
  currentJob : any = [];
  results : any = [];

  constructor(private listingService : ChimerListingService,
              private router : Router) { }

  ngOnInit() {
    this.listingService.retrieveListing().subscribe(data => {
          if(data.success){
            this.allListing = data.results;
          
            this.listingService.getCurrentJob().subscribe(data => {
              if(data.success){
                this.currentJob = data.results;

                for (let temp1 of this.allListing){
                  for(let temp2 of this.currentJob){
                    if (temp1._id != temp2._id){
                      this.results.push(temp1);
                      console.log(this.results)
                    }
                  }
                }
              }
              else{
                this.results = this.allListing;
                //No data
              }
            });
            
          }
          else{
            //No data
          }
       });

  }

  onListing(listing){
    this.listingService.applyListing(listing).subscribe(data => {
      console.log("onListing");
      if (data.success){
        alert("Applied !");
        location.reload();
      }
      else{
        alert("Error saving into database !");
      }
    });
  }
}
