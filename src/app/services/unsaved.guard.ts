import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { adminDashboardComponent } from '../component/admin-dashboard/admin-dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<adminDashboardComponent> {
  canDeactivate(
    component: adminDashboardComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canExit()
  }
  
}
