import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductfiltersService {
filteringURL=""
  constructor(private api:ApiService,private http: HttpClient) { }
//This filter only for state management and sending right data to API
  mainfilter(category?:any,max?:any,min?:any,brand?:any,star?:any){
    if(brand.target.checked){
      this.filteringURL+=`&brand=${brand.target.value}`
    }
    if(!(brand.target.checked)){
      this.filteringURL.replace(`&brand=${brand.target.value}`,"")
      this.api.url.next(this.filteringURL)
    }

    if(star.target.checked){
      this.filteringURL+=`&star_gte=${star.target.value}`
      this.api.url.next(this.filteringURL)
    }
    if(!(star.target.checked)){
      this.filteringURL.replace(`&star_gte=${star.target.value}`,"")
      this.api.url.next(this.filteringURL)
    }

    if(!(min==="")){
      this.filteringURL+=`&price_gte=${min.target.value}`
      this.api.url.next(this.filteringURL)
    }
    if(min===""){
      this.filteringURL.replace(`&price_gte=${min.target.value}`,"")
      this.api.url.next(this.filteringURL)
    }

    if(!(max==="")){
      this.filteringURL+=`&price_lte=${max.target.value}`
      this.api.url.next(this.filteringURL)
    }
    if(max===""){
      this.filteringURL.replace(`&price_lte=${max.target.value}`,"")
      this.api.url.next(this.filteringURL)
    }

  }
  filterApi() {
    return this.http.get(`http://localhost:3000/products${this.filteringURL}`)
  }
}
