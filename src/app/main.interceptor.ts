import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {Router} from "@angular/router";

import {AuthService} from "./modules/login/servisces";
import {ITokens} from "./modules/login/interfacecs";

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      request = this.addToken(request, this.authService.getAccessToken());
    }

    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {

        if (res && res.error && res.status === 401) {
          return this.handle401Error(request, next);
        }

        return throwError(() => new Error('token invalid or expired'))
      })
    );
  }


  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {Authorization: `Bearer ${token}`}
    })
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    const refresh = this.authService.getRefreshToken();
    if (!this.isRefreshing && refresh) {
      this.isRefreshing = true
      return this.authService.refresh(refresh).pipe(
        switchMap((tokens: ITokens) => {
          this.isRefreshing = false;
          return next.handle(this.addToken(request, tokens.access));
        }),
        catchError(() => {
          this.isRefreshing = false;
          this.authService.deleteTokens();
          this.authService.deleteRole();
          this.router.navigate(['/login']);
          return throwError(() => new Error('Token invalid or expired'));
        })
      )
    }
  }

}
