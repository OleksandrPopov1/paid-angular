import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {NavigationEnd, NavigationStart} from "@angular/router";
import {Event as NavigationEvent} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private _isLoadingNavigate = new BehaviorSubject<boolean>(false);
  private _isLoadingData = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  startLoading(isLoading: BehaviorSubject<boolean>): void {
    isLoading.next(true);
  }

  endLoading(isLoading: BehaviorSubject<boolean>): void {
    isLoading.next(false);
  }

  isLoadingNavigate(): Observable<boolean> {
    return this._isLoadingNavigate.asObservable();
  }

  isLoadingData(): Observable<boolean> {
    return this._isLoadingData.asObservable();
  }

  checkLoading(e: NavigationEvent): void {
    if (e instanceof NavigationStart) {
      this.checkLoadingData(e) ? this.startLoading(this._isLoadingData) : this.startLoading(this._isLoadingNavigate);
    } else if (e instanceof NavigationEnd) {
      this.checkLoadingData(e) ? this.endLoading(this._isLoadingData) : this.endLoading(this._isLoadingNavigate);
    }
  }

  checkLoadingData(e: NavigationStart | NavigationEnd): boolean {
    return !!e.url.split('?')[1];
  }

}
