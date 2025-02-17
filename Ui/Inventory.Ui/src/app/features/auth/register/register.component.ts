import { Component } from '@angular/core';
import {RegisterRequest} from "../models/register-request.model";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest;

  constructor(private authService: AuthService, private router: Router) {
    this.model = {
      email: '',
      password: '',
      confirmPassword:''

    };
  }

  onFormSubmit(): void {
    if (this.model.password !== this.model.confirmPassword) {
      alert("Mật khẩu không hợp lệ!")
      return;
    }
    this.authService.register({ email: this.model.email, password: this.model.password ,confirmPassword:this.model.confirmPassword}).subscribe({
      next: () => {
        alert('Đăng ký thành công! Hãy đăng nhập.');
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
