import { AbstractControl } from "@angular/forms";
//Similiar to custom validator but different with abstract control you can add directly validations all controlled form objects
// you can use directly pattern attribute also 
export function usernameValidator(control:AbstractControl){
    if(control&&(control.value!==null||control.value!==undefined)){
        const regex=new RegExp(/[a-zA-Z0-9-_]{4,24}/)

        if(!regex.test(control.value)){
            return{
                usernameError:true
            }
        }
    }
    return null
}

