import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems: any = [];
  public grandTotal !: number;
  
  constructor(private cartService: CartService, private api:ApiService ) { }



  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.cartItems = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

 

  checkout(){
    this.api.checkoutApi(this.cartItems).subscribe()
    this.cartService.removeAllCart()
  }
}

