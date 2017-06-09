import { UserLoginService } from './../../services/user-login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationsService } from "angular2-notifications";
import { AuthService } from "app/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  jwt: {}
  busy: Subscription;
  loginForm: FormGroup;
  options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(private formBuilder: FormBuilder,
    private loginService: UserLoginService,
    private route: ActivatedRoute,
    private router: Router,
    private _service: NotificationsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.jwt = localStorage.getItem('wearechime');
    // this.authService.isUserLoggedIn(this.jwt).subscribe(data => {
    //   console.log(data);
    // });
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      user: ['chimer'] // setting the default value
    });
  }

  onLogin() {
    let credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    if (this.loginForm.valid) {
      if (this.loginForm.value.user == "chimer") {
        this.busy = this.loginService.chimerLogin(credentials).subscribe(data => {
          if (data.success) {
            // alert("Login chimer!");
            //Set JWT to the local storage
            localStorage.setItem('wearechime', data.jwt);

            //Redirect to home page
            this.router.navigate(['/chimer']);

          }
          else {
            // alert("No such user");
            this._service.error(
              'Error',
              'No such user has been found',
              {
                timeOut: 3000,
                pauseOnHover: false,
                clickToClose: true
              }
            )
          }
        });
      }
      else {
        this.busy = this.loginService.brandLogin(credentials).subscribe(data => {
          if (data.success) {
            // alert("Login brand!");
            //Set JWT to the local storage
            localStorage.setItem('wearechime', data.jwt);

            //Redirect to home page
            this.router.navigate(['/brand']);
          }
          else {
            this._service.error(
              'Error',
              'No such user has been found',
              {
                timeOut: 3000,
                pauseOnHover: false,
                clickToClose: true
              }
            )
          }
        });
      }
    }

    else if (this.loginForm.value.email == "" || this.loginForm.value.password == "") {
      this._service.error(
        'Error',
        'Please enter your credentials',
        {
          timeOut: 3000,
          pauseOnHover: false,
          clickToClose: true
        }
      )
    }
  }
}
