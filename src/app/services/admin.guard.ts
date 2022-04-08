import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private api:ApiService,private router:Router,private toastr: ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
      // if your role is not admin at backend you can not reach dashboard
      // returning to login page for admin login
    const user=this.api.user.value
        if(user.role=="admin"){
          return true
        } 
        else{
          this.toastr.error('You can not access without permission')
          this.router.navigate([""])
          localStorage.clear()
          return false
        }
      }
   
  }
  

