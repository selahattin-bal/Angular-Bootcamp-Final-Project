import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductfiltersService {
//sending data to api so public
public filteringURL="?"
//state for products private(safe)
private dataSource= new BehaviorSubject<any>({})

  constructor(private api:ApiService) { }

//Access methods for state
data=this.dataSource.asObservable()

sendData(data:string){
    this.dataSource.next(data)
  }

//Filter methods for products 
starFilterService(star:any){
  if(star.target.checked){
    this.filteringURL+=`&star_gte=${star.target.value}`
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
  if(!(star.target.checked)){
    let replace=`&star_gte=${star.target.value}`
    this.filteringURL= this.filteringURL.replace(replace,"")
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
 }

brandFilterService(brand:any){
  if(brand.target.checked){
    this.filteringURL+=`&brand=${brand.target.value}`
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
  if(!(brand.target.checked)){
    let replace=`&brand=${brand.target.value}`
    this.filteringURL= this.filteringURL.replace(replace,"")
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
}

priceFilterService(min:any,max:any){
  if(!(min==="")){
    if(this.filteringURL.includes("&price_gte"))
    {let replace=`&price_gte=${min}`
    this.filteringURL= this.filteringURL.replace(/&price_gte=\d+/,replace)}
   else{this.filteringURL+=`&price_gte=${min}`} 
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
  if(min===""){
    this.filteringURL.replace(`&price_gte=${min}`,"")
    let replace=`&price_gte=${min}`
    this.filteringURL= this.filteringURL.replace(replace,"")
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }

  if(!(max==="")){
    if(this.filteringURL.includes("&price_lte"))
    { let replace=`&price_lte=${max}`
    this.filteringURL= this.filteringURL.replace(/&price_lte=\d+/,replace)}
   else{this.filteringURL+=`&price_lte=${max}`} 
   this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
  if(max===""){
    this.filteringURL.replace(`&price_lte=${max}`,"")
    let replace=`&price_lte=${max}`
    this.filteringURL= this.filteringURL.replace(replace,"")
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
}

categoryFilterService(category:string){
  if(!(category=='')){
    if(this.filteringURL.includes("&category"))
    {let replace=`&category=${category}`
    this.filteringURL= this.filteringURL.replace(/&category=[a-z]+/,replace)}
    else{this.filteringURL+=`&category=${category}`}
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
  if(category==''){
    this.filteringURL= this.filteringURL.replace(/&category=[a-z]+/,"")
    this.api.filterApi(this.filteringURL).subscribe(res=>this.dataSource.next(res))
  }
}

}
