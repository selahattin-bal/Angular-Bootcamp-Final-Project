import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit,OnDestroy {
  private sub$:any
  public orders: any = []
  constructor(private api: ApiService) { }

  // taking orders from server
  ngOnInit(): void {
   this.sub$= this.api.ordersApi().subscribe(
      res => {
        this.orders = res
      })
  }
  ngOnDestroy(): void {
      this.sub$?.unsubscribe()
  }
}