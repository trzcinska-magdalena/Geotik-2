import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, MatTabsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  reseted = false;


  formReset = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private userService: UserService) {

  }

  onSubmitReset() {
    if (!this.formReset.invalid) {
      const email = this.formReset.controls.email.value;

      if (email && this.userService.getUser(email)) {
        this.reseted = true;
      }
    }
  }
}
