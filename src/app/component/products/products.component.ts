import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductfiltersService } from 'src/app/services/productfilters.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  private products: any;
  //var. for templates

  public star: number[] = [1, 2, 3, 4, 5];
  public filteredProducts: any
  public searchKey: string = "";
  public viewGrid = true
  public uniqueBrands:any = []
  public filteringURL=`?`

  constructor(private api: ApiService, private cartService: CartService, private router: Router, private toastr: ToastrService,private productFilter:ProductfiltersService,private http: HttpClient) { }

  ngOnInit(): void {
    //getting product from server
    this.api.getProductApi()
      .subscribe(res => {
        this.products = res;
        this.filteredProducts = res;
        //checking unique brands for same brand inputs from db 
        //so can display dynamically in brand filter
        this.products.forEach((element: any) => {
          return this.uniqueBrands.push(element.brand)
        })
        this.uniqueBrands = this.uniqueBrands.filter((item: any,
          index: any) => this.uniqueBrands.indexOf(item) === index);
      });
    // data transfer for search handling ( filter in subcribe not working so pipe is used)
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val
    })
    
  }


  // Sending element id to product detail paramMap
  onSelect(item: any) {
    this.router.navigate(["/products", item.id])
  }
  // adding item to cart
  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this.toastr.success('Item Added To Cart', 'Checkout');
  }

  //changing view style
  viewHandler(category: string) {
    if (category === "grid") {
      this.viewGrid = true
    }
    if (category === "list") {
      this.viewGrid = false
    }
  }



  //Filtering Operations(By api requests)
  categoryFilter(category: string) {
    this.productFilter.categoryFilterService(category)
    this.productFilter.data.subscribe(res=>this.filteredProducts=res)
  }

  priceFilter(min: any, max: any) {
    this.productFilter.priceFilterService(min,max)
    this.productFilter.data.subscribe(res=>this.filteredProducts=res)
  }

 
  brandFilter(brand: any) { 
    this.productFilter.brandFilterService(brand)
    this.productFilter.data.subscribe(res=>this.filteredProducts=res)
  }

  starFilter(star: any) {
  this.productFilter.starFilterService(star)
  this.productFilter.data.subscribe(res=>this.filteredProducts=res)
  }

}
