import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginRequest} from "../models/login-request.model";
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../models/login-response.model";
import {environment} from "../../../../environments/environment";
import {User} from "../models/user.model";
import {CookieService} from "ngx-cookie-service";
import {RegisterRequest} from "../models/register-request.model";
import {AddInventoryRequest} from "../../inventory/models/add-inventory-request.model";
import {Inventory} from "../../inventory/models/inventory.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
              private cookieService: CookieService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`, {
      email: request.email,
      password: request.password
    });
  }
  register(model: RegisterRequest) : Observable<RegisterRequest> {
    return this.http.post<RegisterRequest>(`${environment.apiBaseUrl}/api/auth/register`, model);
  }


  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user() : Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(',')
      };

      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
