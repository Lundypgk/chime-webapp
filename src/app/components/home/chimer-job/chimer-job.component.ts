import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChimerListingService } from '../../../services/chimer-listing.service';

@Component({
  selector: 'app-chimer-job',
  templateUrl: './chimer-job.component.html',
  styleUrls: ['./chimer-job.component.css']
})
export class ChimerJobComponent implements OnInit {
  results : any = [];
  completedJobs : any = [];
  inProgressJobs : any = [];
  jwt : String;

  constructor(private listingService : ChimerListingService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');    
    this.listingService.getCurrentJob(this.jwt).subscribe(data => {
          if(data.success){
            this.inProgressJobs = data.results;
          }
          else{
            //No data
          }
       });
  }

  onSubmit(job,url){
    job.url = url;
    job.jwt = this.jwt;
    this.listingService.updateCurrentJob(job).subscribe(data => {
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
