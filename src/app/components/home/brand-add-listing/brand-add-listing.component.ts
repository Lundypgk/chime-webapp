import { BrandListingService } from './../../../services/brand-listing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-add-listing',
  templateUrl: './brand-add-listing.component.html',
  styleUrls: ['./brand-add-listing.component.css']
})
export class BrandAddListingComponent implements OnInit {
  listingForm: FormGroup;
  jwt: String;
  busy: Subscription;


  constructor(private formBuilder: FormBuilder,
    private listingService: BrandListingService,
    private router: Router) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');
    this.listingForm = this.formBuilder.group({
      description: ['', Validators.required],
      budget: ['', Validators.required],
      perks: ['', Validators.required],
      requirements: ['', Validators.required]
    });
  }

  onSubmit() {
    let listing = {
      description: this.listingForm.value.description,
      budget: this.listingForm.value.budget,
      perks: this.listingForm.value.perks,
      requirements: this.listingForm.value.requirements
    }
    if (this.listingForm.valid) {
      this.busy = this.listingService.postListing(listing, this.jwt).subscribe(data => {
        if (data.success) {
          //Redirect to home page
          this.router.navigate(['/brand']);
        }
        else {
          alert("Error saving into database !");
        }
      });
    }
  }
}
