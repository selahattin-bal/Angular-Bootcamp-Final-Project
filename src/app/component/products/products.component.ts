import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private api: ApiService, private cartService: CartService, private router: Router, private toastr: ToastrService) { }

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

  //Filtering Operations(also can be done by api requests)
  categoryFilterHandler(category: string) {
    this.filteredProducts = this.products
      .filter((product: any) => {
        if (product.category == category || category == '') {
          return product;
        }
      })
  }

  priceFilter(min: any, max: any) {
    this.filteredProducts = this.products
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

  //Dynamic brand filter
  selectedBrands: any = []
  tempBrands: any = []
  brandFilter(brand: any) {
    if (brand.target.checked) {
      this.tempBrands.push(brand.target.value)
      this.selectedBrands = []
      for (let i = 0; i < this.tempBrands.length; i++) {
        this.selectedBrands.push(this.products.filter((element: any) => element.brand == this.tempBrands[i]))
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
    //flat() used for deleting [] bc. [0] did not work
    this.filteredProducts = this.selectedBrands.flat()
    console.log(this.filteredProducts)
    if (this.selectedBrands.length === 0) {
      this.filteredProducts = this.products
    }
  }

  starFilter(star: any) {
    if (star.target.value == 1)
      this.filteredProducts = this.products
        .filter((product: any) => {
          if (0 <= product.star && product.star <= 5) {
            return product;
          }
        })
    if (star.target.value == 2)
      this.filteredProducts = this.products
        .filter((product: any) => {
          if (4 <= product.star) {
            return product;
          }
        })
    if (star.target.value == 3)
      this.filteredProducts = this.products
        .filter((product: any) => {
          if (3 <= product.star && product.star < 4) {
            return product;
          }
        })
    if (star.target.value == 4)
      this.filteredProducts = this.products
        .filter((product: any) => {
          if (0 <= product.star && product.star < 3) {
            return product;
          }
        })
  }

}
