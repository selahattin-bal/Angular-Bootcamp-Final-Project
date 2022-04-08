import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
//Guards should be supported with back end this way is not legit way to use
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //If anyone logged in registered in local storage with login event
    //Also if they logout local storage will be deleted and this will return false guard will be activated 

    if (localStorage.getItem('token')) {
      return true
    }
    else {
      this.toastr.error('You can not access without login', 'Alert!')
      this.router.navigate([''])
      return false
    }
  }

}
