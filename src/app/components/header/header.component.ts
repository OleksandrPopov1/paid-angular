import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../modules/login/servisces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(value => {
      this.isAdmin = value?.is_superuser;
    })
  }

  navigateToPage(path: string): void {
    this.router.navigate([path]);
  }

}
