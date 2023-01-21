import {Component, Input, OnInit} from '@angular/core';

import {IOrders} from "../../interfaces";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input()
  order: IOrders;

  constructor() { }

  ngOnInit(): void {
  }

}
