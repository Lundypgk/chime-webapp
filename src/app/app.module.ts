import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrandHomeComponent } from './components/home/brand-home.component';
import { BrandAddListingComponent } from './components/home/brand-add-listing/brand-add-listing.component';
import { BrandHomeDetailComponent } from './components/home/brand-home-detail/brand-home-detail.component';
import { UserLoginService } from './services/user-login.service';
import { BrandListingService } from './services/brand-listing.service';

const appRoutes : Routes = [
  { path:'login', component: LoginComponent},
  { path:'brand', component: BrandHomeComponent},  
  { path:'brand/listing/:id', component: BrandHomeDetailComponent},
  { path:'brand/addListing', component: BrandAddListingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BrandHomeComponent,
    LoginComponent,
    BrandAddListingComponent,
    BrandHomeDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [BrandListingService,UserLoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
