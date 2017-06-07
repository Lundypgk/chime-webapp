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
    editing:boolean = false;
    buttontext = "Edit";

    //store updates
    updates:any = {} ;
    // Toggle For Email
    editingEmail:boolean = false;
    oldEmail:string;
    newEmail:string;
    // Toggle For Mobile
    editingMobile:boolean = false;
    oldMobile:string;
    newMobile:string;
    // Toggle For Bank
    editingBank:boolean = false;
    oldBank:string;
    newBank:string;
    // Toggle For Address
    editingAddress:boolean = false;
    oldStreet:string;
    oldUnit:string;
    oldPostal:string;    
    newStreet:string;
    newUnit:string;
    newPostal:string;  

    constructor(private _ChimerListing: ChimerListingService){}

   ngOnInit() {
        this.jwt = localStorage.getItem('wearechime');
        this.busy = this._ChimerListing.retrieveChimerDetail(this.jwt).subscribe(data =>{
            if (data.success) {
                this.Data = data.results;
            }
            else
            {
               //null
            }
        });
   }

   isEditing(){
        this.editing= !this.editing;
        
        if (this.buttontext == "Edit")
        {
            this.buttontext = "Done"
        }
        else {
            this.buttontext = "Edit"
        }
   }

   //Start of  Editing Email
   editEmail(){
    this.editingEmail = !this.editingEmail;
    
   }

   submitEmail(){
       this.editingEmail = !this.editEmail;
       this.oldEmail = this.Data[0].Email;

       if ((this.oldEmail == this.newEmail) || (this.newEmail == null || "" || undefined ) ) //check for difference
       {
           console.log("no Difference"); //can remove
           this.newEmail = this.oldEmail;
       }
       else //if not the same
       {    
         this.updates = this.Data[0];
         this.updates.jwt = this.jwt;
         this.updates.Email = this.newEmail;
         console.log(this.updates);
         this.busy = this._ChimerListing.updateProfile(this.updates).subscribe(data => {
            if (data.success) {
                console.log("done");
            }
            else {
                //No data
            }
            });
       }
   }
   //End of  Editing Email

   
 //Start of  Editing Mobile
   editMobile(){
    this.editingMobile = !this.editingMobile;
    
   }

   submitMobile(){  //not done changing this shit yet brrb
       this.editingMobile = !this.editingMobile;
       this.oldMobile = this.Data[0].Mobile;

       if ((this.oldMobile == this.newMobile) || (this.newMobile == null || "" || undefined ) ) //check for difference
       {
           console.log("no Difference"); //can remove
           this.newMobile = this.oldMobile;
       }
       else //if not the same
       {    
         this.updates = this.Data[0];
         this.updates.jwt = this.jwt;
         this.updates.Mobile = this.newMobile;
         console.log(this.updates);
         this.busy = this._ChimerListing.updateProfile(this.updates).subscribe(data => {
            if (data.success) {
                console.log("done");
            }
            else {
                //No data
            }
            });
       }
   }
   //End of  Editing Mobile

   //Start of  Editing bank
   editBank(){
    this.editingBank = !this.editingBank;
    
   }

   submitBank(){  //not done changing this shit yet brrb
       this.editingBank = !this.editingBank;
       this.oldBank = this.Data[0].Bank;

       if ((this.oldBank == this.newBank) || (this.newBank == null || "" || undefined ) ) //check for difference
       {
           console.log("no Difference"); //can remove
           this.newBank = this.oldBank;
       }
       else //if not the same
       {    
         this.updates = this.Data[0];
         this.updates.jwt = this.jwt;
         this.updates.Bank = this.newBank;
         console.log(this.updates);
         this.busy = this._ChimerListing.updateProfile(this.updates).subscribe(data => {
            if (data.success) {
                console.log("done");
            }
            else {
                //No data
            }
            });
       }
   }
   //End of  Editing Bank
   
     //Start of  Editing Address
   editAddress(){
    this.editingAddress = !this.editingAddress;
    
   }
   submitAddress(){
        this.editingAddress = !this.editingAddress;
        this.oldPostal = this.Data[0].Postal;
        this.oldStreet = this.Data[0].Street;
        this.oldUnit   = this.Data[0].Unit;

         if ((this.oldPostal == this.newPostal) || (this.newPostal == null || "" || undefined ) ) //check for difference
       {
           console.log("no Difference"); //can remove
           this.newPostal = this.oldPostal;
       }
           else
       {
         this.updates = this.Data[0];
         this.updates.jwt = this.jwt;
        
         this.updates.Postal = this.newPostal;
         console.log(this.updates);
         this.busy = this._ChimerListing.updateProfile(this.updates).subscribe(data => {
            if (data.success) {
                console.log("done");
            }
            else {
                //No data
            }
            });
       } 
         if ((this.oldStreet == this.newStreet) || (this.newStreet == null || "" || undefined ) ) //check for difference
       {
           console.log("no Difference"); //can remove
           this.newStreet = this.oldStreet;
       }
           else
       {
         this.updates = this.Data[0];
         this.updates.jwt = this.jwt;
         this.updates.Street = this.newStreet;
        
         console.log(this.updates);
         this.busy = this._ChimerListing.updateProfile(this.updates).subscribe(data => {
            if (data.success) {
                console.log("done");
            }
            else {
                //No data
            }
            });
       } 

       if ((this.oldUnit == this.newUnit) || (this.newUnit == null || "" || undefined ) ) //check for difference
       {
           console.log("no Difference"); //can remove
           this.newUnit = this.oldUnit;
       }
       else
       {
         this.updates = this.Data[0];
         this.updates.jwt = this.jwt;
        
         this.updates.Unit = this.newUnit;
       
         console.log(this.updates);
         this.busy = this._ChimerListing.updateProfile(this.updates).subscribe(data => {
            if (data.success) {
                console.log("done");
            }
            else {
                //No data
            }
            });
       } 
   }

   //End of Editing Address

}
