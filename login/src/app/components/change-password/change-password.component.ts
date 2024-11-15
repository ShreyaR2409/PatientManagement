import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private authService: AuthService) {}
  ChangePasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    retypePassword: new FormControl('', [Validators.required]),
  });

 
  onSubmit() {
    if (this.ChangePasswordForm.valid) {
      const { email, oldPassword, newPassword, retypePassword } =
        this.ChangePasswordForm.value;

      // Ensure newPassword matches retypePassword
      if (newPassword !== retypePassword) {
        alert("New password and retype password do not match.");
        return;
      }

      // Call the AuthService to change the password
      this.authService
        .changePassword({ email, oldPassword, newPassword })
        .subscribe(
          (response) => {
            alert(response); // Success message
          },
          (error) => {
            alert("Failed to change password. Please try again.");
          }
        );
    } else {
      alert("Please fill all required fields correctly.");
    }
  }
}
