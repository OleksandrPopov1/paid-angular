import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

import {IOrders, IOrdersPaginated} from "../../interfaces";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: IOrders[];
  count: number;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(
      map(value => value['orders'] as IOrdersPaginated<IOrders>)
    ).subscribe((value) => {
      console.log(value)
      this.count = value.count;
      this.orders = value.results;
    })
  }

}
