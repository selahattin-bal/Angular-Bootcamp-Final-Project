import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private api:ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.api.getToken()
    // if there is a token add this token in http request(at header part) so backend can check required validations
    if(authToken){
      request=request.clone({
        setHeaders:{
          Authorization:`Bearer ${authToken}`
        }
      })
    }
    return next.handle(request);
  }
}
