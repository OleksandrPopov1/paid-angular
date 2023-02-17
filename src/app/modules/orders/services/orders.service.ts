import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Params} from "@angular/router";

import {IOrders, IOrdersUpdate} from "../interfaces";
import {urls} from "../../../constants";
import {IPaginated} from "../../../share";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(params: Params): Observable<IPaginated<IOrders>> {
    return this.httpClient.get<IPaginated<IOrders>>(urls.orders.orders, {params}).pipe(
      tap(value => {
        value.results.map(orders => {
          orders.created_at = this._replaceDate(orders.created_at)
        })
      })
    );
  };

  getById(id: number): Observable<IOrders> {
    return this.httpClient.get<IOrders>(`${urls.orders.orders}/${id}`).pipe(
      tap(orders => {
        orders.created_at = this._replaceDate(orders.created_at);
      })
    );
  };

  updateById(id: number, orders: IOrdersUpdate): Observable<IOrdersUpdate> {
    return this.httpClient.patch<IOrdersUpdate>(`${urls.orders.orders}/${id}`, orders);
  };

  getExcel(params:Params): Observable<any>{
    return this.httpClient.get(urls.orders.excel, {params, responseType: "blob"});
  }

  private _replaceDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-GB').replaceAll('/', '-');
  }


}
