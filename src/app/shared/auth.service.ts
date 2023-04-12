import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = false;

  constructor(private router: Router) {}

  authenticate(email: string, password: string) {
    if (email === 'rupesh@valuemomentum.com' && password === 'rupesh') {
      this.isAuthenticated = true;
      this.router.navigateByUrl('company');
    }
    return this.isAuthenticated;
  }
}
