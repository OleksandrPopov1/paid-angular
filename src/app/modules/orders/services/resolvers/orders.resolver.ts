import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {IOrders} from "../../interfaces";
import {OrdersService} from "../orders.service";
import {IPaginated} from "../../../../share";

@Injectable({
  providedIn: 'root'
})
export class OrdersResolver implements Resolve<IPaginated<IOrders>> {

  constructor(private ordersService: OrdersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaginated<IOrders>> {
    const newParams = route.queryParams;
    return this.ordersService.getAll(newParams);
  }
}
