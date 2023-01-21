import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

import {IOrders, IOrdersPaginated, IQueryParams} from "../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IOrdersPaginated<IOrders>> {

    // const params: HttpParams = new HttpParams().appendAll({...newParams});
    // console.log(params)
    return this.httpClient.get<IOrdersPaginated<IOrders>>(urls.orders.orders);

  }

}
