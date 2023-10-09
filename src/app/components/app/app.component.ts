import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nwp-domaci-3-frontend';

  displayLogin: string = "block";
  displayLogout: string = "none";

  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit(): void {
    this.loginService.isLoggedIn.subscribe((loggedIn) => {
      if (loggedIn) {
        this.setLogout();
      } else {
        this.setLogin();
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem("jwt");
    this.loginService.setLoggedInBehavior(false);
    this.goToLogin();
  }

  private setLogin() {
    this.displayLogin = "block";
    this.displayLogout = "none";
  }

  private setLogout() {
    this.displayLogin = "none";
    this.displayLogout = "block";
  }


}
