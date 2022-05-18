import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  private sub:any
  //At beginning getting data dynamically at cartItems then all quantity actions made by method
  public cartItems: any = [];
  public grandTotal: number = 0
  constructor(private cartService: CartService, private api: ApiService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
   this.sub= this.cartService.getProducts()
      .subscribe(res => {
        this.cartItems = res;
        this.cartItems.forEach((item: any) => {
          //assigning quantity and total for checkout 
          Object.assign(item,{quantity: 1, total: Number(item.price)});
          //deleting comment and star bc. it is unnecessary for order
          delete item.comments
          delete item.star
        });
        //calculation for grandtotal 
        this.grandTotal = 0
        for (let item of this.cartItems) {
          this.grandTotal += Number(item.total)
        }
      })
  }
  //checking quantity from template so total price and quantity values can be updated
  quantity(quantity: any, index: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (i == index) {
        this.cartItems[i].quantity = Number(quantity.target.value)
        this.cartItems[i].total = Number(this.cartItems[i].price) * Number(quantity.target.value)
      }
    }
    //calculation for grandtotal 
    this.grandTotal = 0
    for (let item of this.cartItems) {
      this.grandTotal += Number(item.total)
    }
  }

  //removing coming item from service so all page will be updated automatically
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  //adding random order number 
  //sending order to database with ordernumber,username and JWT
  checkout() {
    let user: any = this.api.getToken()
    let orderNumber = Math.floor(Math.random() * 1000000)
    let order: any = [{ "user": user, "ordernumber": orderNumber }, { "order": this.cartItems }]
    this.api.checkoutApi(order).subscribe()
    this.toastr.success('You ordered succesfully', 'Checkout');
    this.cartService.removeAllCart()
    this.router.navigate(["orders"])
  }

  ngOnDestroy(): void {
      this.sub?.unsubscribe()
  }
}

