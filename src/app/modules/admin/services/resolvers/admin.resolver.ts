import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';

import {AdminService} from "../admin.service";
import {IPaginated, IUser} from "../../../../share";

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<IPaginated<IUser>> {

  constructor(private adminService: AdminService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPaginated<IUser>> {
    return this.adminService.getAll({page: 1, size: 9});
  }
}
