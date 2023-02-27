import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

import {IStatistic, IStatisticStatus} from "../../intarfaces";

@Component({
  selector: 'app-orders-statistic',
  templateUrl: './orders-statistic.component.html',
  styleUrls: ['./orders-statistic.component.css']
})
export class OrdersStatisticComponent implements OnInit {
  statuses: IStatisticStatus[];
  ordersCount: number;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      map(data => data['statistic'] as IStatistic)
    ).subscribe(value => {
      this.statuses = value.statuses;
      this.ordersCount = value.total_count;
    })
  }

}
