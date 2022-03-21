import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
public orders:any=[]
  constructor(private api:ApiService) { }

// taking orders from server
  ngOnInit(): void {
    this.api.ordersApi().subscribe(
      res=>{
      this.orders=res  
      }
      )

}
}