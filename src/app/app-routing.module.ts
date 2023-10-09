import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {TokenGuard} from "./guards/token.guard";
import {RoleEnum} from "./model/role-enum";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {UpdateUserComponent} from "./components/update-user/update-user.component";

const routes: Routes = [
  {
    path: "users",
    component: UsersComponent,
    canActivate: [TokenGuard],
    data: {roles: [RoleEnum.CAN_READ, RoleEnum.CAN_UPDATE, RoleEnum.CAN_DELETE]}
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create-user",
    component: CreateUserComponent,
    canActivate: [TokenGuard],
    data: {roles: [RoleEnum.CAN_CREATE]}
  },
  {
    path: "update-user/:userId",
    component: UpdateUserComponent,
    canActivate: [TokenGuard],
    data: {roles: [RoleEnum.CAN_UPDATE]}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
