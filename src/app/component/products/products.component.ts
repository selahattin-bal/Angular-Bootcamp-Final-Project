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

  //TEMPLATE DEN ERİŞMEK İÇİN PUBLİC OLACAK
  public star: number[] = [1, 2, 3, 4, 5];

  public productList: any;
  public filterCategory: any
  public searchKey: string = "";
  public viewGrid =true

  constructor(private api: ApiService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    //getting product from server
    this.api.getProductApi()
      .subscribe(res => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
        console.log(this.productList)
      });
    // data transfer for search handling
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })


  }

  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  //category filtering 
  categoryFilterHandler(category: string) {
    this.filterCategory = this.productList
      .filter((product: any) => {
        if (product.category == category || category == '') {
          return product;
        }
      })
  }


  viewHandler(category: string) {
    if(category==="grid") {
      this.viewGrid=true
    }
    if(category==="list"){
      this.viewGrid=false
    }
  }

  priceFilter(min: any, max: any) {
    this.filterCategory = this.productList
      .filter((product: any) => {
        if (max !== "") {
          if (Number(min) <= Number(product.price) && Number(product.price) <= Number(max)) {
            return product;
          }
        }
      })
  }


  // Sending element id to product detail paramMap
  onSelect(item: any) {
    this.router.navigate(["/products", item.id])
  }

}
