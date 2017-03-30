import { Router } from '@angular/router';
import { ChimerListingService } from './../../services/chimer-listing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chimer-navbar',
  templateUrl: './chimer-navbar.component.html',
  styleUrls: ['./chimer-navbar.component.css']
})
export class ChimerNavbarComponent implements OnInit {

  constructor(private listingService : ChimerListingService,
              private router : Router) { }

  ngOnInit() {
  }

  onLogOut(){
    this.listingService.logOut().subscribe(data => {
        alert("Successully log out !");
        this.router.navigate(['/login']);
       });
  }
}