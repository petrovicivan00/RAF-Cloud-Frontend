import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupComponent} from "../popup/popup.component";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserResponse} from "../../model/responses/user-response";
import {RoleEnum} from "../../model/role-enum";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  create: boolean = false;
  read: boolean = false;
  update: boolean = false;
  delete: boolean = false;

  userId: number = -1;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  emailRegex: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  @ViewChild(PopupComponent)
  popupComponent!: PopupComponent;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = +params['userId'];
    })

    this.userService.getUser(this.userId).subscribe((user) => {
      this.setUser(user);
    }, () => {
      this.openPopup("Error!", "Something wrong!");
    });

  }

  updateUser() {
    if (this.checkNameAndSurname() && this.checkEmail()) {
      this.userService.updateUser(this.userId, this.firstName, this.lastName, this.email, this.getRoles()).subscribe(() => {
        this.goToUsersPage();
      }, error => {
        this.openPopup("Error!", error.message);
      });
    }
  }

  goToUsersPage() {
    this.router.navigate(['/users']);
  }

  private setUser(user: UserResponse) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;

    this.create = user.userRoles.includes(RoleEnum.CAN_CREATE);
    this.read = user.userRoles.includes(RoleEnum.CAN_READ);
    this.update = user.userRoles.includes(RoleEnum.CAN_UPDATE);
    this.delete = user.userRoles.includes(RoleEnum.CAN_DELETE);
  }

  private openPopup(title: string, message: string) {
    this.popupComponent.title = title;
    this.popupComponent.message = message;
    this.popupComponent.displayStyle = "block";
  }

  private checkNameAndSurname(): boolean {
    return this.firstName != "" && this.lastName != "";
  }

  private checkEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  private getRoles(): string[] {
    let roles: string[] = []
    if (this.create) {
      roles.push(RoleEnum.CAN_CREATE);
    }
    if (this.read) {
      roles.push(RoleEnum.CAN_READ);
    }
    if (this.update) {
      roles.push(RoleEnum.CAN_UPDATE);
    }
    if (this.delete) {
      roles.push(RoleEnum.CAN_DELETE);
    }
    return roles;
  }
}
