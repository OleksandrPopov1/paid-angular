import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Params, Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";

import {GroupsService, LoadService} from "../../services";
import {IInputOptions} from "../../interfaces";
import {inputsFilters} from "../../constants";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  allParams: Params;
  filtersOptions: IInputOptions[];
  isLoading: boolean;
  isChecked = false;

  constructor(
    private router: Router,
    private loadService: LoadService,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.allParams = params;
      this.isChecked = params['my'];
    });

    this.groupsService.getAll().subscribe(() => {
      inputsFilters.map(options => {
        if (options.inputServerName === 'group') {
          this.groupsService.getNamesGroups().subscribe(groups => {
            options.selectOptions = groups;
          })
        }
      })
    });

    this.filtersOptions = inputsFilters;

    this.loadService.isLoading().subscribe(value => this.isLoading = value);

    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.loadService.startLoading()
      } else if (e instanceof NavigationEnd) {
        this.loadService.endLoading()
      }
    });
  }

  resetFilters = (): void => {
    this.router.navigate([], {queryParams: {}});
  };

  getMy = ({checked}: MatCheckboxChange): void => {
    const check = checked ? checked : null;
    this.router.navigate([], {
      queryParams: {...this.allParams, 'my': check, 'page': 1},
      queryParamsHandling: "merge"
    });
  }

}
