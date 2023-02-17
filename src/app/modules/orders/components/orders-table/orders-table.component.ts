import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {map} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {animate, state, style, transition, trigger} from "@angular/animations";

import {IHeaderOptions, IOrders,} from "../../interfaces";
import {headersNames} from "../../constants";
import {IPaginated} from "../../../../share";

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ]
})
export class OrdersTableComponent implements OnInit, AfterViewInit {
  orders: IOrders[];
  count: number;
  allParams: Params;
  headers: IHeaderOptions[];
  headersName: string[];
  expandedElement: IOrders | null;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private detectorRef: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._initialData();
    this.headers = headersNames;
    this.headersName = headersNames.map(value => value.headerServerName);
  }


  ngAfterViewInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.allParams = params;
      this.paginator.pageIndex = params['page'] - 1;
      this.detectorRef.detectChanges();
    });

    this.paginator.page.subscribe((page) => {
      this.router.navigate([], {queryParams: {...this.allParams, page: page.pageIndex + 1}});
    });

    this.sort.sortChange.subscribe((value) => {
      const order: string = value.direction === 'asc' ? value.active : `-${value.active}`;
      this.paginator.pageIndex = 0;
      this.router.navigate([], {queryParams: {...this.allParams, order, page: 1}});
    })
  }


  _initialData(): void {
    this.activatedRoute.data.pipe(
      map(value => value['orders'] as IPaginated<IOrders>)
    ).subscribe((value) => {
      this.orders = value.results;
      this.count = value.count;
    })
  }

}
