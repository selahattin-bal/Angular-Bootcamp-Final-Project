import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls:['signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private router:Router, private api:ApiService) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      // validators for signup form
    username:["", Validators.required],
    email:["", [Validators.required, Validators.email]],
    password:["",[Validators.required,Validators.minLength(6)]],
   
    })
  }
  // sending data with api.signUp 
  signUp(){
    this.api.signUp(this.signupForm).subscribe(res=>{
      alert("You have signed up successfully ")
      this.signupForm.reset()
      this.router.navigate(["login"]) 
  },err=>{
    alert("Something went wrong")
  })
  }
}
