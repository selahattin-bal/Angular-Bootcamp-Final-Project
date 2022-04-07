import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterPipe } from './shared/filterHandler.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsdetailComponent } from './component/productsdetail/productsdetail.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { FooterComponent } from './component/footer/footer.component';
import { OrdersComponent } from './component/orders/orders.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorHandleInterceptor } from './interceptors/error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DialogComponent } from './component/dialog/dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { UnsavedGuard } from './services/unsaved.guard';
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    ProductsdetailComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    OrdersComponent,
    DashboardComponent,
    DialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  MatIconModule,
  MatToolbarModule,
  MatButtonModule,
  MatDialogModule,
 MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: ErrorHandleInterceptor, 
      multi: true 
    }
  ],
  entryComponents: [ConfirmDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
