import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  checkUser = new BehaviorSubject<boolean>(false);

  constructor(private http : HttpClient, private router:Router) {}

//posting to db.json for fake json server
//firstly you have to start json server for working json-server --watch db.json 

//Http requests

  getProductApi(){
    return this.http.get<any>("http://localhost:3000/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  checkoutApi(itemList:any){
    return this.http.post<any>("http://localhost:3000/orders",itemList) 
   }
  
  
  
   ordersApi(){
    return this.http.get<any>("http://localhost:3000/orders").pipe(map((res:any,i)=>{
      return res[i]
    }))
   }
  

  //Signup and login API's
  signUp(signupForm:any){
    return this.http.post<any>("http://localhost:3000/signupUsers",signupForm.value) 
  }

  login(){
    return this.http.get<any>("http://localhost:3000/signupUsers").pipe(map((res:any)=>{
      return res
    }))
  }



}