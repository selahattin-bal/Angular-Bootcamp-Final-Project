import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productsdetail',
  templateUrl: './productsdetail.component.html',
  styleUrls: ['./productsdetail.component.css']
})
export class ProductsdetailComponent implements OnInit {
  //for star template
  public star: number[] = [1, 2, 3, 4, 5];
  //public bc they will reached by template
  public productsDetail: any
  public currentUrl!: string

  constructor(private route: ActivatedRoute, private api: ApiService, private cartService: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    //With paramMap you can route multiple page with only one template 
    let itemId: any = this.route.snapshot.paramMap.get("id")
    this.currentUrl =`?id=${Number(itemId)}`
    //For template view taking data from server 
    this.api.filterApi(this.currentUrl).subscribe(
      res => {
        this.productsDetail = res;
        console.log(this.productsDetail)
      })
  }
  //adding to cart from product detail page
  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this.toastr.success('Item Added To Cart', 'Checkout');
  }


}
