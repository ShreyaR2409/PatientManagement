import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {

  constructor(private authService : AuthService, private router : Router){}

  ForgetForm = new FormGroup({
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required])
})

onSubmit(){
  const user = this.ForgetForm.value;
  this.authService.resetPassword(user).subscribe(res =>{
    if (res === 'Email not found.'){
      alert("Email not found. Please check the email address.");
    }
    else{
      alert("Password reset successfully!");
      this.router.navigateByUrl('login');
    }
  })
}
}
