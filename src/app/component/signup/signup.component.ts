import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { passwordMatchValidatorService } from 'src/app/services/passwordMatchValidator.service';
import { usernameValidator } from 'src/app/services/regexValidator';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  public signupForm!: FormGroup
  private sub$?:Subscription
  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService, private match: passwordMatchValidatorService, private toastr: ToastrService) { }
  //using pattern att. for regex valid.(common patterns are used)
  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({

      //3 Type of Validation Added

      // usernameValidator added in default validation from regexValidator.ts (1)
      username: ["", usernameValidator],
      // default validators(2)
      email: ["", Validators.pattern(this.emailPattern)],
      password: ["", [Validators.required, Validators.pattern(this.pwdPattern)]],
      confirmpassword: [""],
      //fake JWT and role for new user
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssfdgdf",
      role: "user"
    },
      {
        //custom validator(3)from passwordMatchValidator.ts
        validator: this.match.passwordMatchValidator('password', 'confirmpassword')
      }
    )
  }
  // sending data with signUp api
  //To show error message subcribe is used
  signUp() {
    this.sub$=this.api.signUp(this.signupForm).subscribe(res => {
      this.toastr.success('You have signed up successfully')
      this.signupForm.reset()
      this.router.navigate(["login"])
    }, err => {
      this.toastr.error("Something went wrong")
    })
  }


  ngOnDestroy(): void {
    this.sub$?.unsubscribe()
  }
}

