import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/login-request.model";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../models/login-response.model";
import {environment} from "../../../../environments/environment";
import {User} from "../models/user.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http : HttpClient,
              private cookieService :CookieService) {

  }
  login(loginRequet: LoginRequest) :Observable<LoginResponse>{
    return  this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      email:loginRequet.email,
      password :loginRequet.password
    })
  }
  setUser(user: User): void {
    // Kiểm tra nếu user.roles là đối tượng và có thuộc tính $values
    if (user.roles && user.roles.values() && Array.isArray(user.roles.values())) {
      const roles = user.roles.values(); // Lấy mảng roles từ $values
      this.$user.next(user);
      localStorage.setItem('user-email', user.email); // Lưu email vào localStorage
      localStorage.setItem('user-roles', user.roles.join(',')); // Lưu roles vào localStorage dưới dạng chuỗi
    } else {
      console.error('Roles is not a valid array:', user.roles);
    }
  }


  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(',') // Chuyển chuỗi thành mảng
      };

      return user;
    }

    return undefined;
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }
  logout(){
    localStorage.clear();
    this.cookieService.delete('Authorization','/')
    this.$user.next(undefined);
  }

}
