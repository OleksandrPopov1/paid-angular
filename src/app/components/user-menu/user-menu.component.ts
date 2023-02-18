import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../modules/login/servisces";
import {IUser} from "../../share";

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {
  user: IUser;
  userInitials: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.setAuthUser();
    this.authService.getUser().subscribe(user => {
      if (user) {
        const checkDate: number = new Date(user.create_at).getDate();

        if (!!checkDate) {
          user.create_at = this.changeDate(new Date(user.create_at));
          user.update_at = this.changeDate(new Date(user.update_at));
          user.last_login = this.changeDate(new Date(user.last_login));
        }

        this.user = user;

        this.userInitials = user.profile.name[0].toLocaleUpperCase() + user.profile.surname[0].toLocaleUpperCase();
      }
    });
  }

  changeDate(date: Date): string {
    return date.toLocaleString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"});
  }

  logOut(): void {
    this.authService.deleteTokens();
    this.authService.deleteRole();
    this.router.navigate(['/login']);
  }

}
