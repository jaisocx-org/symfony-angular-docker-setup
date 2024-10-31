import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if token is stored
    console.log("interceptor check token");
    return this.authService.checkAndFetchAuthToken().pipe(
      switchMap(token => {
        // Clone and modify request with authorization header if token is available
        const authReq = token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
          : req;
        return next.handle(authReq);
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle errors, e.g., refreshing token
        return throwError(error);
      })
    );
  }
}

