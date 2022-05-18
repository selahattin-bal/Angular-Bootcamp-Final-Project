import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';
import { product } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class ApiService {


  public user = new BehaviorSubject<any>("")
  public url=new BehaviorSubject ("")
  private apiURL: string = "http://localhost:3000/"

  constructor(private http: HttpClient) { }

  //posting to db.json for fake json server firstly you have to start json server for working json-server --watch db.json 

  //Http requests for all back-end operations

  //Product and user requests
  getAllProductApi() {
    return this.http.get<product>(`${this.apiURL}products`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  filterApi(filteringUrl:string) {
    return this.http.get<product>(`${this.apiURL}products${filteringUrl}`)
     
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
  login(email: string, password: string) {
    return this.http.get(`${this.apiURL}signupUsers/?email=${email}&password=${password}`)
  }
  getToken() {
    return localStorage.getItem("token")
  }

  //ADMIN requests
  postItemApi(data: any) {
    return this.http.post<any>(`${this.apiURL}products`, data)
  }
  deleteItemApi(id: number) {
    return this.http.delete<any>(`${this.apiURL}products/${id}`)
  }
  updateItemApi(data: any, id: number) {
    return this.http.put<any>(`${this.apiURL}products/${id}`, data)
  }
  getItemApi() {
    return this.http.get<any>(`${this.apiURL}products`)
      .pipe(map((res: any) => {
        return res;
      }))
  }



}