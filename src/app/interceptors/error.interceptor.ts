import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
export class ErrorHandleInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      })
    )
  }
  //Custom Client Errors by result for HTTP requests anothers codes can be added
  handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Unknown message';

    switch (errorRes.error.code) {
      case 400:
        errorMessage = 'Bad Request';
        break;
      case 401:
        errorMessage = 'Unauthorized';
        break;
      case 403:
        errorMessage = ' Forbidden';
        break;
      case 404:
        errorMessage = ' Not Found';
        break;
    }
    alert(errorMessage);

    return throwError(errorMessage);
  }

}