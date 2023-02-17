import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IGroup} from "../interfaces";
import {urls} from "../../../constants";
import {IPaginated} from "../../../share";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private _groups = new BehaviorSubject<IGroup[]>([]);
  private _namesGroups = new BehaviorSubject<string[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IPaginated<IGroup>> {
    return this.httpClient.get<IPaginated<IGroup>>(urls.groups.groups).pipe(
      tap(groups => {
        this._groups.next(groups.results);
        this.setNamesGroups(groups.results);
      })
    );
  };

  create(newGroup: IGroup): Observable<IGroup> {
    return this.httpClient.post<IGroup>(urls.groups.groups, newGroup);
  };

  getGroups(): Observable<IGroup[]> {
    return this._groups.asObservable();
  };

  setNamesGroups(groups: IGroup[]): void {
    this._namesGroups.next(groups.map(group => group.name));
  };

  addNewGroup(group: IGroup): void {
    this._namesGroups.next([group.name, ...this._namesGroups.value]);
    this._groups.next([group, ...this._groups.value]);
  };

  getNamesGroups(): Observable<string[]> {
    return this._namesGroups.asObservable();
  };
}
