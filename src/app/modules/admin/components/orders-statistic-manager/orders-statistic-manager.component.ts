import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";

import {IStatistic, IStatisticStatus} from "../../intarfaces";
import {AdminService} from "../../services";
import {IUser} from "../../../../share";

@Component({
  selector: 'app-orders-statistic-manager',
  templateUrl: './orders-statistic-manager.component.html',
  styleUrls: ['./orders-statistic-manager.component.css']
})
export class OrdersStatisticManagerComponent implements OnInit {
  user: IUser;
  statuses: IStatisticStatus[];
  ordersCount: number;

  constructor(private adminService: AdminService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.adminService.getCurrentUser().subscribe(user => {
      this.user = user
    })


    this.activatedRoute.data.pipe(
      map(data => data['statisticManager'] as IStatistic)
    ).subscribe(value => {
      this.statuses = value.statuses;
      this.ordersCount = value.total_count;
    });
  }

}
