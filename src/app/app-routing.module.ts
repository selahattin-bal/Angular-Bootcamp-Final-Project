import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { CartComponent } from './component/cart/cart.component';
import { LoginComponent } from './component/login/login.component';
import { OrdersComponent } from './component/orders/orders.component';
import { ProductsComponent } from './component/products/products.component';
import { ProductsdetailComponent } from './component/productsdetail/productsdetail.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { UnsavedGuard } from './services/unsaved.guard';

//page routes for components
const routes: Routes = [
  {path:'products', component: ProductsComponent},
  {path:'products/:id', component: ProductsdetailComponent,canActivate:[AuthGuard]},
  {path:'cart', component: CartComponent,canActivate:[AuthGuard]},
  {path:'orders',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:adminDashboardComponent,canDeactivate:[UnsavedGuard]},
  //Wildcard invalid routes and guard will be redirected to here 
  {path:'**', redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
