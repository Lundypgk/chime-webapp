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
      password: ['']
       });
  }

  onLogin(){
    let credentials = {
      username : this.loginForm.value.username,
      password : this.loginForm.value.password
    }
    if(this.loginForm.valid){
       this.loginService.login(credentials).subscribe(data => {
          if(data.success){
            alert("Login !");
            
            //Redirect to home page
            //this.router.navigate(['/']);
          }
          else{
            alert("No such user");
          }
       });
    }
  }
}
