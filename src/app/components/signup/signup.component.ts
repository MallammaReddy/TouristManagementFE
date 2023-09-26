import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators,FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  @ViewChild('s') signupForm: NgForm;
  user: User = new User();
  
  submitted= false;
  loading = false;
  todate: Date;
  error='';
  returnUrl: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: UserService
  ) { }
  
  ngOnInit() {
    this.todate = new Date();
  }

  onSubmit(){
    this.submitted = true;
    console.log(this.user.firstName);
    console.log(this.user.lastName);
    console.log(this.user.dob);
    console.log(this.user.username);
    console.log(this.user.password);
    this.service.signup(this.user).subscribe(data => {
      console.log(data);
      this.user = new User();
      this.signupForm.reset();
      this.router.navigate(['/signup-success']);
    }, err => {
      this.error = "Username is already exist";
    });     
  }
}