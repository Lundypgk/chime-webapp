import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChimerListingService } from '../../../services/chimer-listing.service';
import { NotificationsService } from "angular2-notifications";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chimer-home',
  templateUrl: './chimer-home.component.html',
  styleUrls: ['./chimer-home.component.css']
})
export class ChimerHomeComponent implements OnInit {
  allListing: any = [];
  currentJob: any = [];
  results: any = [];
  jwt: String;
  busy: Subscription;

  constructor(private listingService: ChimerListingService,
    private router: Router,
    private route: ActivatedRoute,
    private _service: NotificationsService) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');
    this.busy = this.listingService.retrieveListing(this.jwt).subscribe(data => {
      if (data.success) {
        this.allListing = data.results;
        this.listingService.getCurrentJob(this.jwt).subscribe(data => {
          if (data.success) {
            this.currentJob = data.results;
            for (let temp1 of this.allListing) {
              let isExist = false;
              for (let temp2 of this.currentJob) {
                if (temp1._id == temp2._id) {
                  isExist = true;
                }
              }
              if (!isExist) {
                this.results.push(temp1);
              }
            }
          }
          else {
            //Display all the listing
            this.results = this.allListing;
          }
        });

      }
      else {
        //No data
        //Need to alert user that no listing
      }
    });

  }

  onListing(listing) {
    listing.jwt = this.jwt;
    this.busy = this.listingService.applyListing(listing).subscribe(data => {
      if (data.success) {
        // this._service.success(
        //   'Success !',
        //   'Data has been saved into database',
        //   {
        //     timeOut: 3000,
        //     pauseOnHover: false,
        //     clickToClose: true
        //   }
        // )
        location.reload();
      }
      else {
        this._service.error(
          'Error',
          'Unable to save into the database',
          {
            timeOut: 3000,
            pauseOnHover: false,
            clickToClose: true
          }
        )
      }
    });
  }
}
