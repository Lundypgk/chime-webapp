import { ListingService } from './../../../services/listing.service';
import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  listingForm: FormGroup;

  
  constructor(private formBuilder: FormBuilder,
              private listingService : ListingService) { }

  ngOnInit() {
    this.listingForm = this.formBuilder.group({
      description: ['', Validators.required],
      budget: ['', Validators.required],
      perks: ['', Validators.required],
      requirements: ['', Validators.required]
    });
  }

  onSubmit(){
    let listing = {
      description : this.listingForm.value.description,
      budget : this.listingForm.value.budget,
      perks : this.listingForm.value.perks,
      requirements : this.listingForm.value.requirements
    }
    if(this.listingForm.valid){
       this.listingService.postListing(listing).subscribe(data => {
          if(data.success){
            console.log("Saved into database !");
          }
          else{
            console.log("Error saving into database !");
          }
       });
    }
  }
}
