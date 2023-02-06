import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IGroup} from "../interfaces";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  private _namesGroups = new BehaviorSubject<string[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<IGroup[]> {
    return this.httpClient.get<IGroup[]>(urls.groups.groups).pipe(
      tap(groups => {
        this.setNamesGroups(groups);
      })
    );
  };

  create(newGroup: IGroup): Observable<IGroup> {
    return this.httpClient.post<IGroup>(urls.groups.groups, newGroup);
  };

  setNamesGroups(groups: IGroup[]): void {
    this._namesGroups.next(groups.map(group => group.name));
  };

  addNewGroup(group: IGroup): void {
    this._namesGroups.next([group.name, ...this._namesGroups.value]);
  };

  getNamesGroups(): Observable<string[]> {
    return this._namesGroups.asObservable();
  };
}
