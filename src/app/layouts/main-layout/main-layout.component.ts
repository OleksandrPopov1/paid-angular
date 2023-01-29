import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../modules/login/servisces";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      this.isAuth = this.authService.isAuthenticated();
    })
  }

}
