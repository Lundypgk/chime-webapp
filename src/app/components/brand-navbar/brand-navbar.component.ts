import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-brand-navbar',
  templateUrl: './brand-navbar.component.html',
  styleUrls: ['./brand-navbar.component.css']
})
export class BrandNavbarComponent implements OnInit {

  constructor(private router: Router,
    private _service: NotificationsService) { }

  ngOnInit() {
  }

  onLogOut() {
    localStorage.removeItem("wearechime");
    this.router.navigate(['/login']);
    this._service.success(
      'You Have Logged Out', '',
      {
        timeOut: 3000,
        pauseOnHover: false,
        clickToClose: true
      }
    )
  }
}
