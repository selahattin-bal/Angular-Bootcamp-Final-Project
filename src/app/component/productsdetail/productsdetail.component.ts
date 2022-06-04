import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-productsdetail',
  templateUrl: './productsdetail.component.html',
  styleUrls: ['./productsdetail.component.css'],
})
export class ProductsdetailComponent implements OnInit, OnDestroy {
  private sub$: any;
  //for star template
  public star: number[] = [1, 2, 3, 4, 5];
  //public bc they will reached by template
  public productsDetail: any;
  public currentUrl!: string;
  public commentForm!: FormGroup;
  public rating = 3;
  private itemId: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cartService: CartService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    //With paramMap you can route multiple page with only one template
    this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUrl = `?id=${this.itemId}`;
    //For template view taking data from server
    this.sub$ = this.api.filterApi(this.currentUrl).subscribe((res) => {
      this.productsDetail = res;
    });

    this.commentForm = this.formBuilder.group({
      username: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }
  //adding to cart from product detail page
  addtocart(item: any) {
    this.cartService.addtoCart(item);
    this.toastr.success('Item Added To Cart', 'Checkout');
  }

  submit() {
    let date = new Date().toString();
    let comment = {
      username: this.commentForm.value.username,
      comment: this.commentForm.value.comment,
    };
    Object.assign(comment, { time: date });
    //Star section
    //In real application this should not divided by 2 this is only for mock up
    this.productsDetail[0].star =
      (this.productsDetail[0].star + this.rating) / 2;
    // Comment section
    this.productsDetail[0].comments.push(comment);
    this.api
      .updateItemApi(this.productsDetail[0], this.itemId)
      .subscribe((res) => {
        this.commentForm.reset();
        this.toastr.success('Product Added', 'Success');
      });
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
  }
}
