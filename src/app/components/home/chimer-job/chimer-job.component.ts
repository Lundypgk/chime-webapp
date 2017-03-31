import { Component, OnInit } from '@angular/core';
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

  constructor(private listingService : ChimerListingService) { }

  ngOnInit() {
    this.listingService.getCurrentJob().subscribe(data => {
          if(data.success){

            this.inProgressJobs = data.results;

            console.log(this.inProgressJobs);
          }
          else{
            //No data
          }
       });
  }

  onSubmit(job,url){
    job.url = url;
    console.log(job);
    this.listingService.updateCurrentJob(job).subscribe(data => {
      console.log(data);
          if(data.success){
            console.log("successs");
            alert("Success");
            location.reload();
          }
          else{
            //No data
          }
       });
  }

}
