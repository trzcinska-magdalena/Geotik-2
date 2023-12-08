import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../user.service';

export function checkPasswordCompatibility(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const rePassword = control.get('rePassword');

  if (password && rePassword && password.value !== rePassword.value) {
    return { passwordMismatch: true };
  }

  return null;
}

@Component({
  selector: 'app-login-registration',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    RouterOutlet,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-registration.component.html',
  styleUrl: './login-registration.component.css'
})

export class LoginRegistrationComponent implements OnInit {
  router: Router;
  users: Array<{ email: string, password: string }> = [];

  formLogIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  formSignIn = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    // źródło: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')]),
    rePassword: new FormControl('', [Validators.required])
  }, { validators: checkPasswordCompatibility });

  constructor(router: Router, private userService: UserService) {
    this.router = router;
    this.users = this.userService.getUsers();
  }

  ngOnInit() {
  }

  isControlInvalid(control: AbstractControl): any {
    return control.touched && control.errors;
  }

  isControlValid(control: AbstractControl): any {
    return control.touched && !control.errors;
  }

  passwordStrength(): number {
    let strengthPassword = 0;
    const password = this.formSignIn.controls.password.value;

    if (password) {
      const lower = /[a-z]+/.test(password);
      const upper = /[A-Z]+/.test(password);
      const number = /[0-9]+/.test(password);

      if (lower) {
        strengthPassword += 25;
      }
      if (upper) {
        strengthPassword += 25;
      }
      if (number) {
        strengthPassword += 25;
      }
      if (password.length >= 8) {
        strengthPassword += 25;
      }
    }
    return strengthPassword;
  }

  onSubmitLogIn() {
    if (!this.formLogIn.invalid) {
      const email = this.formLogIn.controls.email.value;
      const password = this.formLogIn.controls.password.value;

      const userExists = this.users.some(user => user.email === email && user.password === password);

      this.router.navigate([userExists ? 'home' : 'error']);
    }
  }

  onSubmitSignIn() {
    if (!this.formSignIn.invalid) {
      const email = this.formSignIn.controls.email.value;
      const password = this.formSignIn.controls.password.value;

      if (email && password) {
        this.userService.addUser(email, password);
        console.log(this.userService.getUsers());
      } 
    }
  }
}
