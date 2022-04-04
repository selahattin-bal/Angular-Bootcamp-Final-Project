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
  public filteredProducts: any
  public searchKey: string = "";
  public viewGrid = true

  constructor(private api: ApiService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    //getting product from server
    this.api.getProductApi()
      .subscribe(res => {
        this.productList = res;
        this.filteredProducts = res;
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
  // APİ isteği ile yapılabilir. ama hali hazırda datayı aldım neden bir daha istek atayım
  //SERVİS YAIZOLABİLİRŞ AMA BAŞKA YERDE LAZIM DEĞİL ŞİMDİLİK GEREK YOK 
  categoryFilterHandler(category: string) {
    this.filteredProducts = this.productList
      .filter((product: any) => {
        if (product.category == category || category == '') {
          return product;
        }
      })
  }


  viewHandler(category: string) {
    if (category === "grid") {
      this.viewGrid = true
    }
    if (category === "list") {
      this.viewGrid = false
    }
  }
  // APİ isteği ile yapılabilir. ama hali hazırda datayı aldım neden bir daha istek atayım

  //REFACTOR SWTİCH CASE
  priceFilter(min: any, max: any) {
    this.filteredProducts = this.productList
      .filter((product: any) => {
        if (max === "") {
          if (Number(min) <= Number(product.price)) {
            return product;
          }
        }
        if (min === "") {
          if (Number(product.price <= Number(max))) {
            return product;
          }
        }
        else {
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

// DB den gelen brand e göre şekil alıyor yani dinamik
  selectedBrands: any = []
  tempBrands: any = []
  brandFilter(brand: any) {
    if (brand.target.checked) {
      this.tempBrands.push(brand.target.value)
      this.selectedBrands = []
      for (let i = 0; i < this.tempBrands.length; i++) {
        this.selectedBrands.push(this.productList.filter((element: any) => element.brand == this.tempBrands[i]))
      }
    }
    else {
      this.tempBrands = this.tempBrands.filter((element: any) => element != brand.target.value)
      this.selectedBrands = []
      for (let i = 0; i < this.tempBrands.length; i++) {
        this.selectedBrands.push(this.filteredProducts.filter((element: any) => element.brand == this.tempBrands[i]))
      }
      this.filteredProducts = this.selectedBrands
      console.log(this.selectedBrands)
    }
    this.filteredProducts = {}
    this.filteredProducts = this.selectedBrands.flat()
    console.log(this.filteredProducts)
    if (this.selectedBrands.length === 0) {
      this.filteredProducts = this.productList
    }
  }

}
