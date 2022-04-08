import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
// Values to communication between components
//Behavior subject you can give initial value , you can next another observable anytime inside, you can emmit data and observe it

  public cartItemList:product[] =[]
   // productlist main data storage for service it is private so you can not reach directly
  private productList = new BehaviorSubject<product[]>([]);
  //Carrying data between navbar and products components for filtering pipe operation. 
  public search = new BehaviorSubject<string>("");
  
  constructor() { }
  //methods for safety to reach productlist from outside
  getProducts(){
    return this.productList.asObservable();
  }
  setProduct(product : product[]){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
//Adding products to cart from products page
  addtoCart(product :product){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
  }

//Removing item from cart
  removeCartItem(product: product){
    this.cartItemList.map((item:any, index:number)=>{
      if(product.id=== item.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  // Removing all cart for checkout 
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

 
}
