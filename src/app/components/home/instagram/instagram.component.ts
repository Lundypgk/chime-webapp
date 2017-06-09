import { Component, OnInit } from '@angular/core';
import { InstagramService } from "app/services/instagram.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {
  response: any;
  code: String;

  constructor(private instagramService: InstagramService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.code = this.activatedRoute.snapshot.queryParams['code'];
    if (this.code) {
      this.instagramService.accessToken(this.code).subscribe(result => {
        this.response = JSON.parse(result);

        console.log("response " + this.response);
        console.log("result " + result);
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
