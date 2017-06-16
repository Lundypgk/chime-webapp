import { Component, OnInit } from '@angular/core';
import { InstagramService } from "app/services/instagram.service";
import { ActivatedRoute } from "@angular/router";
import { ChimerListingService } from '../../../services/chimer-listing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {
  response: any;
  code: String;
  busy: Subscription;
  jwt : string;
  followers: string;
  update : any = {};

  constructor(private instagramService: InstagramService,
    private activatedRoute: ActivatedRoute,
    private _ChimerListing: ChimerListingService) { }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParams['code'];
    if (this.code) {
      this.instagramService.accessToken(this.code).subscribe(result => {
        this.response = JSON.parse(result);

        console.log("response " + this.response);
        console.log("result " + result);
        console.log("result " + this.response.data.counts.followed_by);
        this.update.follower = this.response.data.counts.followed_by;
        this.update.jwt = localStorage.getItem("wearechime");
        console.log(this.update);
        this.busy = this._ChimerListing.updateFollowers(this.update).subscribe(data => {
            if (data.success) {
                console.log("done");
                window.location.href="http://localhost:4200/chimer";
            }
            else {
                //No data
                console.log("ada error");
            }
            });
      });
    }

  }

  onAuth() {
    window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=e32aad0fbd83428da6c89a922eaf260e&redirect_uri=http://localhost:4200/instagram&response_type=code"
    // this.instagramService.authenticate().subscribe(data => {
    //   console.log(data);
    // });
  }
}
