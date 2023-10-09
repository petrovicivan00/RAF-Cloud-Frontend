import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import jwtDecode from "jwt-decode";
import {TokenPayload} from "../model/token-payload";
import {catchError, Observable, throwError} from "rxjs";
import {UserResponse} from "../model/responses/user-response";
import {MessageResponse} from "../model/responses/message-response";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = environment.usersUrl;
  private headers = new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem("jwt")
  });

  constructor(private httpClient: HttpClient) {

  }

  createUser(firstName: string, lastName: string, email: string, password: string, userRoles: string[]): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(this.usersUrl + "/create",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userRoles: userRoles
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  getAllUsers(): Observable<UserResponse[]> {
    return this.httpClient.get<UserResponse[]>(this.usersUrl, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )
  }

  getUser(userId: number): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(this.usersUrl + "/" + userId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    )
  }

  checkUserRole(role: string): boolean {
    let token = localStorage.getItem("jwt");
    if (token == null) {
      return false;
    }

    let decoded = jwtDecode<TokenPayload>(token);
    return decoded.roles.includes(role);
  }

  updateUser(userId: number, firstName: string, lastName: string, email: string, userRoles: string[]): Observable<UserResponse> {
    return this.httpClient.put<UserResponse>(this.usersUrl + "/" + userId, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userRoles: userRoles
      },
      {
        headers: this.headers
      }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  deleteUser(userId: number): Observable<MessageResponse> {
    return this.httpClient.delete<MessageResponse>(this.usersUrl + "/" + userId, {
      headers: this.headers
    }).pipe(
      catchError(err => {
        return throwError(() => new Error(err.error.message));
      })
    );
  }
}
