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
  id : any;

  constructor(private listingService : ChimerListingService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
            this.id = params['id'];
        });
    this.listingService.getCurrentJob(this.id).subscribe(data => {
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
    job.chimerId = this.id;
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
