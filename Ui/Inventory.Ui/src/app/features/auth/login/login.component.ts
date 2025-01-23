import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {LoginRequest} from "../models/login-request.model";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  model: LoginRequest
  constructor(private authService : AuthService,
              private cookieService : CookieService,
              private router :Router) {
    this.model={
      email:'',
      password:'',
    }
  }
  onFormSubmit(): void {
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          console.log('Logged in response:', response);

          // Set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict');

          // Set User
          this.authService.setUser({
            email: response.email,
            roles: response.roles
          });

          // Redirect back to Home
          this.router.navigateByUrl('/');
        }
      });
  }


}
