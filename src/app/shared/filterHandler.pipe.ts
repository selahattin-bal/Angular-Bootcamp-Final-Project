import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHandler'
})
export class FilterPipe implements PipeTransform {
// Pipe for search handling

//Usage (value)| filter:filterstring:propname
//With includes method only filtered items will returned
//Everything returning to lowercase so not case sensitive 

  transform(value : any[], filterString: string, propName:string): any[] {
    const result:any =[];
    if(!value || filterString==='' || propName ===''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        result.push(a);
      }
    });
    return result;
  }

}
