import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardComponent } from '../component/dashboard/dashboard.component';


@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<DashboardComponent> {

  canDeactivate(
    component: DashboardComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // running according to canExit output which in dashboard comp.
    return component.canExit()
  }
  
}
