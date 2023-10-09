import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../../model/responses/login-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  email: string = "";
  password: string = "";
  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  login() {
    if (this.checkEmail() && this.checkPassword()) {
      this.loginService.login(this.email, this.password).subscribe((loginResponse: LoginResponse) => {
        localStorage.setItem("jwt", loginResponse.token);
        this.loginService.setLoggedInBehavior(true);
        if (!this.loginService.hasAnyRoles()) {
          alert("You don't have any roles.");
        }
        this.router.navigate(['/']);
      }, error => {
        this.openPopup("Error!", error);
      });
    } else {
      this.openPopup("Error!", "Invalid input.");
    }
  }

  private checkEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  private checkPassword(): boolean {
    return this.password.length >= 4 && this.password.length <= 20;
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle = "block";
  }

}
