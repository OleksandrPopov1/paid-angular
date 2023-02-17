import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../modules/login/servisces";
import {LoadService} from "../../share";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isLoading: boolean;
  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router, private loadService: LoadService) {
  }

  ngOnInit(): void {
    this.loadService.isLoadingNavigate().subscribe(value => this.isLoading = value);

    this.router.events.subscribe(e => {
      this.loadService.checkLoading(e);
      this.isAuth = this.authService.isAuthenticated();
    });
  }

}
