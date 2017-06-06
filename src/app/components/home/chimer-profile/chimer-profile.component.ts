import {Component, OnInit} from '@angular/core';
import { ChimerListingService } from '../../../services/chimer-listing.service';
import { Subscription } from 'rxjs';

@Component({
    selector:'chimer-profile',
    templateUrl: './chimer-profile.component.html',
    styleUrls: ['./chimer-profile.component.css']
})
export class chimerProfileComponent implements OnInit{
    Data : any = [];
    jwt: String;
    busy: Subscription;

    constructor(private _ChimerListing: ChimerListingService){}

   ngOnInit() {
        this.jwt = localStorage.getItem('wearechime');

        this.busy = this._ChimerListing.retrieveChimerDetail(this.jwt).subscribe(data =>{
            if (data.success) {
                this.Data = data.results;
                console.log(this.Data);
            }
            else
            {
               
            }

        });
   }

}
