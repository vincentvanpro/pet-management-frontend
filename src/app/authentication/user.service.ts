import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser: Observable<User>;

  private userApiServerUrl = 'api/user';  // URL to web api

  constructor(private http: HttpClient) { }


  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.userApiServerUrl}/login`, user);
  }
}
