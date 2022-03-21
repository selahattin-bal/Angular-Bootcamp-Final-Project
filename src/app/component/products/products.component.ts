import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // for star template
  star: number[] = [1, 2, 3, 4, 5];

  public productList : any ;
  public filterCategory : any
  searchKey:string ="";
  constructor(private api : ApiService, private cartService : CartService, private router:Router) { }

  ngOnInit(): void {
    //getting product from server
    this.api.getProductApi()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });
// data transfer for search handling
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
  //category filtering 
  categoryFilterHandler(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
// Sending element id to product detail paramMap
  onSelect(item:any){
    this.router.navigate(["/products",item.id])
  }

}
