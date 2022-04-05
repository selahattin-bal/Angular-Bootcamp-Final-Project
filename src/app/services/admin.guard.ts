import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
   
   
  constructor(private api:ApiService,private router:Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
    const user=this.api.user.value
        if(user.role=="admin"){
         
          return true
        } 
        else{
          alert("You can not access without permission")
          this.router.navigate([""])
          localStorage.clear()
          return false
        }
      }
   
  }
  
