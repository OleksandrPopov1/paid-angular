import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {IOrders, IOrdersPaginated} from "../interfaces";
import {urls} from "../../../constants";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(params: Params): Observable<IOrdersPaginated<IOrders>> {
    return this.httpClient.get<IOrdersPaginated<IOrders>>(urls.orders.orders, {params});

  }

}
