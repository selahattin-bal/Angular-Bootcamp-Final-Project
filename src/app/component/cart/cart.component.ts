import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public cartItems: any = [];
  public grandTotal: any=0
  constructor(private cartService: CartService, private api:ApiService ,private router:Router ,private toastr: ToastrService) { }



  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
          this.cartItems = res;
          this.cartItems.forEach((item: any) => {
            Object.assign(item, { quantity: 1, total: Number(item.price) });
            //commentler sipariş ekranına gitmesin diye 
            delete item.comment
          });
          this.grandTotal=0
          for(let item of this.cartItems){
            this.grandTotal+=Number(item.total)
          }
      })

  }


  quantity(quantity:any,index:number){
    for(let i=0;i<this.cartItems.length;i++){
      if(i==index){
 this.cartItems[i].quantity=Number(quantity.target.value)
   this.cartItems[i].total=Number(this.cartItems[i].price)*Number(quantity.target.value)
      }
    }
  this.grandTotal=0
   for(let item of this.cartItems){
    this.grandTotal+=Number(item.total)
  }
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    
  }

 //add to the cart ı cağırıp item in adından 1 tane daha karta ekleme yapılabilir.ama sayaç nasıl çalıaşacak belli değil

  checkout(){
    let user:any=this.api.getToken()
    let orderNumber=Math.floor(Math.random()*1000000)
    let order:any= [{"user":user,"ordernumber":orderNumber},{"order":this.cartItems}]
    this.api.checkoutApi(order).subscribe()
    this.toastr.success('You ordered succesfully', 'Checkout');
    this.cartService.removeAllCart()
    this.router.navigate(["orders"])
  }
}

