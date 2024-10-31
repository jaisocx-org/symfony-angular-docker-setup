// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, map, retry, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AuthState } from '../../store/auth/auth.reducer'; 
import { setAuthToken } from '../../store/auth/auth.actions';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = environment.backendHost + '/api_jwt_login'; // Sample API endpoint
  private timestampJwtRequested: number = 0;
  private jwtFetchTime: number = 60000;

  constructor(
    private http: HttpClient,
    private store: Store<{ auth: AuthState }>
  ) {}

  
  checkAndFetchAuthToken(): Observable<string> {
    console.log("checkAndFetchAuthToken");
    const now: number = (new Date()).getTime();

    return this.store.select('auth').pipe(
      distinctUntilChanged(),
      switchMap(authState => {
        if (authState.token) {
          // Token already exists, no need to fetch
          console.log("return token from store", authState.token);

          // @ts-ignore
          if (now > +authState.expires) {
              console.log("EXPIRED");
              this.timestampJwtRequested = now - 1;
              return this.loginObtainTokenAndSaveToStore();
          }

          return of(authState.token);

        } else {
          if (
            (this.timestampJwtRequested > 0) &&
            (this.timestampJwtRequested > (now - this.jwtFetchTime))
          ) {
            return of();
          } 

          // Token is missing, fetch it from the backend
          this.timestampJwtRequested = now - 1;
          return this.loginObtainTokenAndSaveToStore();
        }
      })
    );
  }


  loginAndObtainToken(): Observable<any> {
    const jwtLoginPayload: any = {
      'login': 'User',
      'password': 'password'
    };

    return this.http.post<any>(
      this.loginUrl,
      jwtLoginPayload
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  loginObtainTokenAndSaveToStore(): Observable<any> {
    return this.loginAndObtainToken().pipe(
      map((response: any) => {
        console.log("login response after fetched", response);

        // Set token in the store
        console.log("Set token in the store");
        this.store.dispatch(setAuthToken({ token: response.token, expires: (+response.expires * 1000), error: null }));
        
        console.log("return token after fetched with http client");
        return response.token;
      }),
      catchError(error => {
        console.error('Failed to fetch token:', error);
        return of(error);
      })
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    const err = new Error('test'); 
    return throwError(() => err);
  }
}
