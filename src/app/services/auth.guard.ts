import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Guards should be supported with back end this way is not legit way
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
//If anyone logged in registered in local storage 
//Also if they logout local storage will be deleted and this will return false


// BURDA GİREN KULLANICI TİPİNE GÖRE NAVİGATE İ BİR DENE
      if(localStorage.getItem('token')){
        return true
      }
    else{
      this.router.navigate([''])
      return false
    }
  }
  
}
