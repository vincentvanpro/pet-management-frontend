import { Injectable } from '@angular/core';
import {User} from "./user";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private userService: UserService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject ? this.currentUserSubject.value : undefined;
  }

  login(user: User): Observable<User> {
    return this.userService.login(user)
      .pipe(map((user: User) => {
        // store user details local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
