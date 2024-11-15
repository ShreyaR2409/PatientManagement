import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'; // Import the inject function
import { AuthService } from './auth.service'; // Adjust the path as necessary

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Use inject to get AuthService
  const router = inject(Router); // Use inject to get Router

  if (authService.isLoggedIn()) {
    return true; // Allow access
  } else {
    router.navigate(['login']); // Redirect to login if not authenticated
    return false; // Block access
  }
};
