import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  concatMap,
  Observable,
  of,
  retry,
  retryWhen,
  throwError,
} from 'rxjs';
import { ErrorCode } from '../enums/enums';
import { AlertifyService } from './alertify.service';
@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private alertifyService: AlertifyService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('HTTP request started');
    return next.handle(request).pipe(
      retryWhen((error) => this.retryRequest(error, 10)),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);
        console.log(error);
        this.alertifyService.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }

  retryRequest(
    error: Observable<HttpErrorResponse>,
    retryCount: number
  ): Observable<unknown> {
    return error.pipe(
      concatMap((chechErr: HttpErrorResponse, count: number) => {
        if (count <= retryCount) {
          switch (chechErr.status) {
            case ErrorCode.serverDown:
              return of(chechErr);
            // case ErrorCode.unauthorised:
            //   return of(chechErr);
          }
        }
        return throwError(chechErr);
      })
    );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status != 0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
