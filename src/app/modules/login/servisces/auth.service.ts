import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

import {IAuth, ITokens} from "../interfacecs";
import {urls} from "../../../constants";
import {IAuthUser} from "../interfacecs/auth-user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _accessTokenKey = 'access';
  private readonly _refreshTokenKey = 'refresh';
  private _authUser = new BehaviorSubject<IAuthUser | null>(null);

  constructor(private httpClient: HttpClient) {
  }

  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.login, user).pipe(
      tap(value => {
        this._setTokens(value);
      })
    )
  }

  refresh(refresh: string): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap(value => {
        this._setTokens(value);
      })
    )
  }

  private _setTokens(tokens: ITokens): void {
    localStorage.setItem(this._accessTokenKey, tokens.access);
    localStorage.setItem(this._refreshTokenKey, tokens.refresh);
  }

  getAccessToken(): string {
    return localStorage.getItem(this._accessTokenKey) || '';
  }

  getRefreshToken(): string {
    return localStorage.getItem(this._refreshTokenKey) || '';
  }

  deleteTokens(): void {
    localStorage.removeItem(this._accessTokenKey);
    localStorage.removeItem(this._refreshTokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  setAuthUser(): void {
    this.httpClient.get<IAuthUser>(urls.user.myUser).subscribe(value => this._authUser.next(value));
  }

  getUser(): Observable<IAuthUser | null> {
    return this._authUser.asObservable();
  }

}
