import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from "@angular/material/select";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {IInputOptions} from "../../interfaces";


@Component({
  selector: 'app-orders-filter-input',
  templateUrl: './orders-filter-input.component.html',
  styleUrls: ['./orders-filter-input.component.css']
})
export class OrdersFilterInputComponent implements OnInit, AfterViewInit {
  allParams: Params;
  value = '';
  timeout: any;

  @Input()
  filterOptions: IInputOptions;

  @ViewChild(MatSelect) inputSelect: MatSelect;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.allParams = params;
      this.value = params[`${this.filterOptions.inputServerName}`] ?? '';
    });
  }

  ngAfterViewInit() {
    if (!this.filterOptions.isNotSelect) {
      this.inputSelect.valueChange.subscribe((value) => {
        this.router.navigate([], {
          queryParams: {...this.allParams, [this.filterOptions.inputServerName]: value, page: 1}
        });
      });
    }

  }

  getValue = ({target}: Event) => {
    const {value} = target as HTMLInputElement;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const newValue = value === '' ? null : value;

      this.router.navigate([], {
        queryParams: {...this.allParams, [this.filterOptions.inputServerName]: newValue, page: 1},
        queryParamsHandling: 'merge'
      })
    }, 500);

  }

}
