import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['login.component.css']
})
export class LoginComponent implements OnInit {

public loginForm!: FormGroup

  constructor(private formBuilder:FormBuilder,
    private router:Router,private api:ApiService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      //validators for login
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    //getting data from json and checking input matching
    this.api.login().subscribe(res=>{
     const user= res.find((a:any)=>{
      return a.email===this.loginForm.value.email && a.password===this.loginForm.value.password
     })
     if(user){
       alert("Login successful")
       this.loginForm.reset()
       // if login succesful routing to homepage
       this.router.navigate(["products"])
       this.api.checkUser.next(true);
       // saving data in local storage
      localStorage.setItem('user', JSON.stringify(res))
     }
       else{
         alert("User not found")
     }
    },err=>{
      alert("Something went wrong")
    })
  }
  
}
