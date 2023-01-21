import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

import {IAuth, ITokens} from "../interfacecs";
import {urls} from "../../../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly accessTokenKey = 'access'
  private readonly refreshTokenKey = 'refresh'

  constructor(private httpClient: HttpClient) {
  }

  login(user: IAuth): Observable<ITokens> {
    return this.httpClient.post<ITokens>(urls.auth.auth, user).pipe(
      tap(value => {
        this._setTokens(value)
      })
    )
  }

  refresh(refresh:string):Observable<ITokens>{
    return this.httpClient.post<ITokens>(urls.auth.refresh, {refresh}).pipe(
      tap(value => {
        this._setTokens(value)
      })
    )
  }

  private _setTokens(tokens: ITokens): void {
    localStorage.setItem(this.accessTokenKey, tokens.access)
    localStorage.setItem(this.refreshTokenKey, tokens.refresh)
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey) || ''
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey) || ''
  }

  deleteTokens():void{
    localStorage.removeItem(this.refreshTokenKey)
    localStorage.removeItem(this.accessTokenKey)
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken()
  }
}
