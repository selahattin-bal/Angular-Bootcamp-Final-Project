import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public user = new BehaviorSubject<any>("")
  private apiURL: string = "http://localhost:3000/"

  constructor(private http: HttpClient, private router: Router) { }

  //posting to db.json for fake json server firstly you have to start json server for working json-server --watch db.json 

  //Http requests for all back-end operations

  //Product and user requests
  getProductApi() {
    return this.http.get<any>(`${this.apiURL}products`)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  checkoutApi(itemList: any) {
    return this.http.post<any>(`${this.apiURL}orders`, itemList)
  }

  ordersApi() {
    return this.http.get<any>(`${this.apiURL}orders`).pipe(map((res: any, i) => {
      return res[i]
    }))
  }


  //Signup and login request
  signUp(signupForm: any) {
    return this.http.post<any>(`${this.apiURL}signupUsers`, signupForm.value)
  }
  login(email: any, password: any) {
    return this.http.get(`${this.apiURL}signupUsers/?email=${email}&password=${password}`)
  }
  getToken() {
    return localStorage.getItem("token")
  }

  //ADMIN requests
  postItemApi(data: any) {
    return this.http.post<any>(`${this.apiURL}products`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  deleteItemApi(id: number) {
    return this.http.delete<any>(`${this.apiURL}products/${id}`)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateItemApi(data: any, id: number) {
    return this.http.put<any>(`${this.apiURL}products/${id}`, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getItemApi() {
    return this.http.get<any>(`${this.apiURL}products`)
      .pipe(map((res: any) => {
        return res;
      }))
  }



}