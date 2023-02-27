import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import {Observable} from 'rxjs';

import {AdminService} from "../admin.service";
import {IStatistic} from "../../intarfaces";

@Injectable({
  providedIn: 'root'
})
export class OrdersStatisticManagerResolver implements Resolve<IStatistic> {

  constructor(private adminService: AdminService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStatistic> {

    this.adminService.getCurrentUser().subscribe(user => {
      if (!user) {
        this.router.navigate(['admin'])
      }
    });

    const {managerId} = route.params;
    return this.adminService.getStatisticManagerById(managerId);
  }
}
