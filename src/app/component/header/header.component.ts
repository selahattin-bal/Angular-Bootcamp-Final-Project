import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
//template var.
  public totalItem: number = 0;
  public searchTerm: string = ""
  public user: any
  constructor(private cartService: CartService, private apiservice: ApiService) { }


  ngOnInit(): void {
    // checking user log for opening logout template
    this.apiservice.user.subscribe((res) => {
      this.user = res;
    })
    //taking data for template of total cart item number
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
  }
    //taking value from search bar to send service
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm)
    this.cartService.search.next(this.searchTerm);
  }

  // clearing local storage for guard and isloggedin for logout button
  logout() {
    this.apiservice.user.next("")
    localStorage.clear()
  }

  //No need to unsubcribtion bc. wont be destroyed
}


