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
  filteringURL=`?`

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
    this.productFilter.filterApi().subscribe()
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

  
// SERVİS E TAŞI 

  //Filtering Operations(also can be done by api requests)
  categoryFilterHandler(category: string) {
    if(!(category=='')){
      if(this.filteringURL.includes("&category"))
      {let replace=`&category=${category}`
      this.filteringURL= this.filteringURL.replace(/&category=[a-z]+/,replace)}
      else{this.filteringURL+=`&category=${category}`}
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
    if(category==''){
      this.filteringURL= this.filteringURL.replace(/&category=[a-z]+/,"")
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
  }

  priceFilter(min: any, max: any) {
    if(!(min==="")){
      if(this.filteringURL.includes("&price_gte"))
      {let replace=`&price_gte=${min}`
      this.filteringURL= this.filteringURL.replace(/&price_gte=\d+/,replace)}
     else{this.filteringURL+=`&price_gte=${min}`} 
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
    if(min===""){
      this.filteringURL.replace(`&price_gte=${min}`,"")
      let replace=`&price_gte=${min}`
      this.filteringURL= this.filteringURL.replace(replace,"")
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }

    if(!(max==="")){
      if(this.filteringURL.includes("&price_lte"))
      { let replace=`&price_lte=${max}`
      this.filteringURL= this.filteringURL.replace(/&price_lte=\d+/,replace)}
     else{this.filteringURL+=`&price_lte=${max}`} 
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
    if(max===""){
      this.filteringURL.replace(`&price_lte=${max}`,"")
      let replace=`&price_lte=${max}`
      this.filteringURL= this.filteringURL.replace(replace,"")
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
  }

 
  brandFilter(brand: any) { 
    if(brand.target.checked){
      this.filteringURL+=`&brand=${brand.target.value}`
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
    if(!(brand.target.checked)){
      let replace=`&brand=${brand.target.value}`
      this.filteringURL= this.filteringURL.replace(replace,"")
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
  }

  starFilter(star: any) {
    if(star.target.checked){
      this.filteringURL+=`&star_gte=${star.target.value}`
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
    if(!(star.target.checked)){
      let replace=`&star_gte=${star.target.value}`
      this.filteringURL= this.filteringURL.replace(replace,"")
      this.http.get(`http://localhost:3000/products${this.filteringURL}`).subscribe(res=>this.filteredProducts=res)
    }
  }

}
