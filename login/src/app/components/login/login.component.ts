import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';
import { Router,RouterLink } from '@angular/router'; 


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService : AuthService, private router : Router){}

  loginForm = new FormGroup({
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required])
  })

get Email(): FormControl{
  return this.loginForm.get('email') as FormControl
}

isUserValid: boolean = false;

loginSubmited(){
  const user = this.loginForm.value;
  this.authService.loginUser(user).subscribe(res =>{
    console.log(res)
    if(res.status === 'Failure'){
      this.isUserValid = false
      alert("Login Unsuccessfull");
    }
    else{
      this.isUserValid = true
      alert("Login Successfull");
      this.authService.setUser(res.user);
      this.router.navigateByUrl('patient');
    }
  })
}

}
