import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';

import {IOrders, IOrdersPaginated} from "../../interfaces";
import {OrdersService} from "../orders.service";

@Injectable({
  providedIn: 'root'
})
export class OrdersResolver implements Resolve<IOrdersPaginated<IOrders>> {

  constructor(private ordersService: OrdersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOrdersPaginated<IOrders>> {
    const newParams = route.queryParams;
    return this.ordersService.getAll(newParams);
  }
}
