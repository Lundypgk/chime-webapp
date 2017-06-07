import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChimerListingService } from '../../../services/chimer-listing.service';
import { NotificationsService } from "angular2-notifications";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chimer-job',
  templateUrl: './chimer-job.component.html',
  styleUrls: ['./chimer-job.component.css']
})
export class ChimerJobComponent implements OnInit {
  results: any = [];
  completedJobs: any = [];
  inProgressJobs: any = [];
  jwt: String;
  busy: Subscription;

  constructor(private listingService: ChimerListingService,
    private route: ActivatedRoute,
    private _service: NotificationsService) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');
    this.busy = this.listingService.getCurrentJob(this.jwt).subscribe(data => {
      if (data.success) {
        console.log(data.results);
        this.inProgressJobs = data.results;
      }
      else {
        //No data
      }
    });
  }

  onSubmit(job, url) {
    job.url = url;
    console.log(job);
    job.jwt = this.jwt;
    console.log(job.jwt);
    // this.busy = this.listingService.updateCurrentJob(job).subscribe(data => {
    //   if (data.success) {
    //     location.reload();
    //   }
    //   else {
    //     //No data
    //   }
    // });
  }

}
