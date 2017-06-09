import { Component, OnInit } from '@angular/core';
import { InstagramService } from "app/services/instagram.service";

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  clientId = '';
  redirectUrl = "http://localhost:4200/chimer";

  constructor(private instagramService: InstagramService) { }

  ngOnInit() {
  }

  onAuth() {
    window.location.href = "https://api.instagram.com/oauth/authorize/?client_id=e32aad0fbd83428da6c89a922eaf260e&redirect_uri=http://localhost:4200/&response_type=token"
    // this.instagramService.authenticate().subscribe(data => {
    //   console.log(data);
    // });
  }
}
