import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from './UserLogin';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


interface TokenResponse {
  token: string;
}

interface SignupResponse {
  _id: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(credentials: UserLogin) {
    return this.http.post<TokenResponse>('http://localhost:3001/api/users/login', credentials);
  }

  signup(credentials: UserLogin) {
    return this.http.post<SignupResponse>('http://localhost:3001/api/users/signup', credentials);
  }

}
