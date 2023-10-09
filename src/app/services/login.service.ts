import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {LoginResponse} from "../model/responses/login-response";
import jwtDecode from "jwt-decode";
import {TokenPayload} from "../model/token-payload";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = environment.loginUrl;

  private loggedInBehavior = new BehaviorSubject(this.getLoginStatus());
  isLoggedIn = this.loggedInBehavior.asObservable();

  constructor(private httpClient: HttpClient) {

  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(this.loginUrl, {
      email: email,
      password: password
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  private getLoginStatus(): boolean {
    return !!localStorage.getItem("jwt");
  }

  setLoggedInBehavior(loggedIn: boolean) {
    this.loggedInBehavior.next(loggedIn);
  }

  hasAnyRoles(): boolean {
    let token = localStorage.getItem("jwt");
    if (token == null) {
      return false;
    }

    let decoded = jwtDecode<TokenPayload>(token);
    return decoded.roles.length > 0;
  }
}
