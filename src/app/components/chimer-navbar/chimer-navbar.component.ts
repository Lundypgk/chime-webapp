import { Router } from '@angular/router';
import { ChimerListingService } from './../../services/chimer-listing.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: 'app-chimer-navbar',
  templateUrl: './chimer-navbar.component.html',
  styleUrls: ['./chimer-navbar.component.css']
})
export class ChimerNavbarComponent implements OnInit {
  @Input('id') id: string;


  constructor(private listingService: ChimerListingService,
    private router: Router,
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
