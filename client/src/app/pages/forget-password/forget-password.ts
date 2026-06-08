import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export default class ForgetPassword implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  forgetPasswordForm!: FormGroup;
  ngOnInit(): void {
    this.forgetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendEmail() {
    console.log(this.forgetPasswordForm.value);
    this.authService.sendEmail(this.forgetPasswordForm.value.email)
    .subscribe({
      next: (res) => {
        alert(res.message);
        this.forgetPasswordForm.reset()
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }
}
