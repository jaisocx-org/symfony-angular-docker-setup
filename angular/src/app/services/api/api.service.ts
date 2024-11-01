// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthInterceptorService } from '../auth-interceptor/auth-interceptor.service';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.backendHost + '/symfony/json/'; // Sample API endpoint
  private http: HttpClient;

  constructor(
    private httpBackend: HttpBackend,
    private authInterceptor: AuthInterceptorService
  ) {
        // Create a new HttpClient instance that uses the auth interceptor
        const handler = {
          handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => {
            return this.authInterceptor.intercept(req, this.httpBackend);
          }
        };
        this.http = new HttpClient(handler as HttpHandler);
  }

  getTestData(): Observable<any> {
    const url: string = 'exampleData1/';

    return this.http.get<any>(this.apiUrl + url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  getSampleData(): Observable<any> {
    const url: string = 'exampleData2/';

    return this.http.get<any>(this.apiUrl + url).pipe(
      retry(2),
      catchError(this.handleError)
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


