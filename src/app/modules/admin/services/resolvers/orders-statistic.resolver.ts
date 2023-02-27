import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {AdminService} from "../admin.service";
import {IStatistic} from "../../intarfaces";

@Injectable({
  providedIn: 'root'
})
export class OrdersStatisticResolver implements Resolve<IStatistic> {

  constructor(private adminService: AdminService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStatistic> {
    return this.adminService.getStatisticAllOrders();
  }
}
