import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import jwtDecode from "jwt-decode";
import {TokenPayload} from "../model/token-payload";

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let roles = route.data['roles'];
    let token = localStorage.getItem("jwt");

    if (token) {
      let decoded = jwtDecode<TokenPayload>(token);
      for (let userRole of decoded.roles) {
        if (roles.includes(userRole)) {
          return true;
        }
      }
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
