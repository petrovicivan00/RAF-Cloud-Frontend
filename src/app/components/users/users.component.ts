import {Component, OnInit, ViewChild} from '@angular/core';
import {UserResponse} from "../../model/responses/user-response";
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {RoleEnum} from "../../model/role-enum";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserResponse[] = []
  canDelete: boolean = false;
  canUpdate: boolean = false;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.canDelete = this.userService.checkUserRole(RoleEnum.CAN_DELETE);
    this.canUpdate = this.userService.checkUserRole(RoleEnum.CAN_UPDATE);
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
    }, error => {
      this.openPopup("Error!", error.message);
    });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId).subscribe((message) => {
      this.removeUser(userId)
      this.openPopup("Success!", message.message);
    }, error => {
      this.openPopup("Error!", error.message);
    })
  }

  printRoles(roles: string[]): string {
    return roles.toString();
  }

  openUpdateUser(userId: number) {
    this.router.navigate(["/update-user", userId]);
  }

  private removeUser(userId: number) {
    this.users.forEach((user, index) => {
      if (user.id === userId) this.users.splice(index, 1);
    });
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle = "block";
  }

}
