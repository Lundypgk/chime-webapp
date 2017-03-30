import { UserLoginService } from './../../services/user-login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private loginService : UserLoginService,
              private router : Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
      user: ['']
       });
  }

  onLogin(){
    let credentials = {
      username : this.loginForm.value.username,
      password : this.loginForm.value.password
    }
    if(this.loginForm.valid){
      console.log(this.loginForm.value.user);
      if (this.loginForm.value.user == "chimer"){
          this.loginService.chimerLogin(credentials).subscribe(data => {
          if(data.success){
            alert("Login chimer!");

            //Redirect to home page
            this.router.navigate(['/chimer']);
          }
          else{
            alert("No such user");
          }
       });
      }
      else{
          this.loginService.brandLogin(credentials).subscribe(data => {
          if(data.success){
            alert("Login brand!");

            //Redirect to home page
            this.router.navigate(['/brand']);
          }
          else{
            alert("No such user");
          }
       });
      }
    }
  }
}
