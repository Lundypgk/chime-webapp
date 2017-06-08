import { Component, OnInit } from '@angular/core';
import { InstagramService } from "app/services/instagram.service";

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  constructor(private instagramService: InstagramService) { }

  ngOnInit() {
  }

  onAuth() {
    this.instagramService.authenticate().map(data => { });
  }
}
