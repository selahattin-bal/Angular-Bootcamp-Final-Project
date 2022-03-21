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

  public totalItem : number = 0;
  public searchTerm !: string;
  public isLoggedIn:boolean=false
  constructor(private cartService : CartService,private apiservice:ApiService) { }


  
  ngOnInit(): void {
    // checking user for logout template
    this.apiservice.checkUser.subscribe((res) => {
      this.isLoggedIn = res;
    })
    //taking data for template of total cart item number
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
//checking ınput to search
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

// clearing local storage for guard and isloggedin for logout button

  logout(){
    localStorage.clear()
   this.isLoggedIn=false
  }
  
  }


