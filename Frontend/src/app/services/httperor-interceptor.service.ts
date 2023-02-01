import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, of, retry, retryWhen, throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
  constructor(private alertifyService: AlertifyService){}
  intercept(request: HttpRequest<any>, next: HttpHandler){
    console.log("HTTP request started")
    return next.handle(request)
    .pipe(
      retryWhen(error =>
        error.pipe(
          concatMap((chechErr: HttpErrorResponse, count: number) => {
            if(chechErr.status === 0 && count <= 10){
              return of(chechErr);
            }
            return throwError(chechErr);
          })
        )),
      catchError((error: HttpErrorResponse) =>{
        const errorMessage = this.setError(error);
        console.log(error);
        this.alertifyService.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown error occured';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      if(error.status != 0){
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
