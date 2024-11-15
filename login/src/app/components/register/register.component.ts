import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  repeatPass : string ='none'; 

  constructor(private authService : AuthService){}

    registerForm = new FormGroup({
      firstname: new FormControl<string>("", [Validators.required]),
      lastname: new FormControl<string>("", [Validators.required]),
      email: new FormControl<string>("", [Validators.required]),
      mobileNumber: new FormControl<string>("", [Validators.required]),
      gender: new FormControl<string>("", [Validators.required]),
      password: new FormControl<string>("", [Validators.required]),
      retypepassword: new FormControl<string>("", [Validators.required]),
      agentId: new FormControl("")
    });

    get PWD(): FormControl{
      return this.registerForm.get('password') as FormControl;
    }

    get RPWD(): FormControl{
      return this.registerForm.get('retypepassword') as FormControl;
    }

    registerSubmited(){
      if(this.PWD.value == this.RPWD.value){
      const newUser = this.registerForm.value;
      this.authService.registerUser(newUser).subscribe(res =>
      {
        console.log(res);
        alert(res);
      }
      );
    }
    else{
      this.repeatPass='inline';
    }
  }

}

