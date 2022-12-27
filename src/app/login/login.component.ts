import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../authentication/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string = '';
  password : string = '';

  user : User = {} as User;


  constructor(private authService : AuthenticationService, private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = '';
    this.password = '';
  }

  navigateToPetListOrReturnUrlIfPresent() {
    let url = this.activatedRouter.snapshot.queryParamMap.get('returnUrl');
    if (url) {
      this.router.navigate([url]);
    } else {
      this.router.navigate(['/pets']);
    }
  }

  login() {
    this.user.username = this.username;
    this.user.password = this.password;

    this.authService.login(this.user).subscribe({
      next: (response) => {
        if(response == null) {
          alert("Username or password is wrong");
          this.ngOnInit();
        } else {
          this.navigateToPetListOrReturnUrlIfPresent();
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
