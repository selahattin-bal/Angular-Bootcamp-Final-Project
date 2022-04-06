import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
// Values for outside communication
//Bey Behavior subject you can give initial value , you can next another observable anytime , you can emmit data and observe it

  public cartItemList : any =[]
  private productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<any>("");
  
  constructor() { }
  
  getProducts(){
// asobservable güvenlik asğlamak amaçlı kimse bu getproduct la ulaşanlar next yapamasın diye 
//BÜTÜN SİSTEM PRODUCTLİST ÜZERİNDE Çalışıyor cart item list aracı 
    return this.productList.asObservable();
  }
  getSearch() { 
    return this.search.asObservable();
 }
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((price:any)=>{
      grandTotal += price.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any){
    this.cartItemList.map((item:any, index:any)=>{
      if(product.id=== item.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

 
}
