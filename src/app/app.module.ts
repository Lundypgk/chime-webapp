import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BusyModule } from 'angular2-busy';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrandNavbarComponent } from './components/brand-navbar/brand-navbar.component';
import { BrandHomeComponent } from './components/home/brand-home/brand-home.component';
import { BrandAddListingComponent } from './components/home/brand-add-listing/brand-add-listing.component';
import { BrandHomeDetailComponent } from './components/home/brand-home-detail/brand-home-detail.component';
import { ChimerHomeComponent } from './components/home/chimer-home/chimer-home.component';
import { ChimerListingService } from './services/chimer-listing.service';
import { UserLoginService } from './services/user-login.service';
import { BrandListingService } from './services/brand-listing.service';
import { ChimerNavbarComponent } from './components/chimer-navbar/chimer-navbar.component';
import { ChimerJobComponent } from './components/home/chimer-job/chimer-job.component';
import { ChimerLoginGuard } from "./guard/chimer-login.guard";
import { AuthService } from "./services/auth.service";
import { BrandLoginGuard } from "app/guard/brand-login.guard";
import { PaymentComponent } from './components/home/payment/payment.component';
import { PaymentService } from "app/services/payment.service";

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'brand', component: BrandHomeComponent, canActivate: [BrandLoginGuard] },
  { path: 'brand/listing/:id', component: BrandHomeDetailComponent, canActivate: [BrandLoginGuard] },
  { path: 'brand/add-listing', component: BrandAddListingComponent, canActivate: [BrandLoginGuard] },
  { path: 'chimer', component: ChimerHomeComponent, canActivate: [ChimerLoginGuard] },
  { path: 'chimer/jobs', component: ChimerJobComponent, canActivate: [ChimerLoginGuard] },
  { path: 'payment', component: PaymentComponent },
  { path: '**', redirectTo: '/' }
]

@NgModule({
  declarations: [
    AppComponent,
    BrandNavbarComponent,
    BrandHomeComponent,
    LoginComponent,
    BrandAddListingComponent,
    BrandHomeDetailComponent,
    ChimerHomeComponent,
    ChimerNavbarComponent,
    ChimerJobComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    SimpleNotificationsModule.forRoot()
  ],
  providers: [ChimerListingService, BrandListingService, UserLoginService, AuthService, PaymentService, ChimerLoginGuard, BrandLoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
