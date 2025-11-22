import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly excluded = [
    '/auth/refresh',
    '/auth/login',
    '/auth/cadastrar',
    '/auth/logout'
  ];

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isExcluded(req.url)) {
      return next.handle(req);
    }

    const token = this.auth.getToken();
    const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

    return next.handle(authReq).pipe(
      catchError(err => this.handleError(err, req, next))
    );
  }

  private handleError(err: any, req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (err instanceof HttpErrorResponse && err.status === 401 && !this.isExcluded(req.url)) {
      return this.auth.refreshToken().pipe(
        switchMap(newToken => {
          if (!newToken) {
            this.auth.logout();
            return throwError(() => err);
          }
          const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
          return next.handle(cloned);
        }),
        catchError(innerErr => {
          this.auth.logout();
          return throwError(() => innerErr);
        })
      );
    }

    return throwError(() => err);
  }

  private isExcluded(url: string): boolean {
    try {
      const u = new URL(url, window.location.origin).pathname;
      return this.excluded.some(path => u.startsWith(path));
    } catch {
      return this.excluded.some(p => url.includes(p));
    }
  }
}