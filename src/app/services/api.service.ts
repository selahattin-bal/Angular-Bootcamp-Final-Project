import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  public checkUser = new BehaviorSubject<boolean>(false);
  private apiURL:string="http://localhost:3000/"

  constructor(private http : HttpClient, private router:Router) {}

//posting to db.json for fake json server
//firstly you have to start json server for working json-server --watch db.json 

//Http requests

//Product requests
  getProductApi(){
    return this.http.get<any>(`${this.apiURL}products`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  checkoutApi(itemList:any){
    return this.http.post<any>(`${this.apiURL}orders`,itemList) 
   }
  
  
  
   ordersApi(){
    return this.http.get<any>(`${this.apiURL}orders`).pipe(map((res:any,i)=>{
      return res[i]
    }))
   }
  

  //Signup and login API's
  signUp(signupForm:any){
    return this.http.post<any>(`${this.apiURL}signupUsers`,signupForm.value) 
  }

  login(){
    return this.http.get<any>(`${this.apiURL}signupUsers`).pipe(map((res:any)=>{
      return res
    }))
  }

  logout(){
    this.checkUser.next(false)
    localStorage.clear()
  }

  getToken(){
   return localStorage.getItem("token")
  }
  
  //ADMIN SECTION

  Postadmin(data : any){
    return this.http.post<any>(`${this.apiURL}products`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Deleteadmin(id : number){
    return this.http.delete<any>(`${this.apiURL}products/${id}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Updateadmin(data : any){
    return this.http.put<any>(`${this.apiURL}products/${data.id}`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  Getadmins(){
    return this.http.get<any>(`${this.apiURL}products`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }



}