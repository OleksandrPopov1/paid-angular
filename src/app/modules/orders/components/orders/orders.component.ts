import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";

import {GroupsService, OrdersService} from "../../services";
import {IInputOptions} from "../../interfaces";
import {inputsFilters} from "../../constants";
import {LoadService} from "../../../../share";

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
    private groupsService: GroupsService,
    private ordersService: OrdersService
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

    this.loadService.isLoadingData().subscribe(value => this.isLoading = value);

    this.router.events.subscribe(e => {
      this.loadService.checkLoading(e);
    });
  }

  resetFilters(): void {
    this.router.navigate([], {queryParams: {}});
  };

  getMy({checked}: MatCheckboxChange): void {
    const check = checked ? checked : null;
    this.router.navigate([], {
      queryParams: {...this.allParams, 'my': check, 'page': 1},
      queryParamsHandling: "merge"
    });
  }

  getExcel(): void {
    this.ordersService.getExcel(this.allParams).subscribe(data => {
      const a = document.createElement('a');
      a.setAttribute('type', 'hidden');
      a.href = URL.createObjectURL(data);
      a.download = 'orders.xls';
      a.click();
      a.remove();
    });
  }

}
