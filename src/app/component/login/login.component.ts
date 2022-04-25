import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  private sub$:any
  public loginForm!: FormGroup
  
  constructor(private formBuilder: FormBuilder,
    private router: Router, private api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //validators for login
      email: ["admin@admin", Validators.required],
      password: ["123456", Validators.required]
    })
  }

  login() {
    //getting data from json and checking input matching and adding their JWT to local storage
    //also routing according to their role 
   this.sub$= this.api.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data: any) => {
      if (data.length !== 0) {
        this.api.user.next(data[0])
        this.loginForm.reset()
        localStorage.setItem('token', JSON.stringify(data[0].token))
        if (data[0].role === "admin") {
          this.router.navigate(["dash"])
          this.toastr.success('You have logged-in successfully')
        }
        else if (data[0].role === "user") {
          this.router.navigate(["products"])
          this.toastr.success('You have logged-in successfully')
        }
      } else {
        this.toastr.error('Email or Password Wrong');
      }
    });
  }

ngOnDestroy(): void {
    this.sub$?.unsubscribe()
}
}