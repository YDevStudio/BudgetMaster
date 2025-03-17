import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.auth.register(this.registerForm.value.username, this.registerForm.value.password)
      this.auth.register(this.registerForm.value.username, this.registerForm.value.password)
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: (err) => {
            console.error('Registration error:', err);
            this.errorMessage = 'Registration failed: ' + (err.error?.message || err.message || '');
          }
        });
    }
  }
}