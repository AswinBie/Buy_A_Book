import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../custom-validators/confirm-password.validator';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-reset',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset.html',
  styleUrl: './reset.css',
})
export default class Reset implements OnInit {
  resetForm!: FormGroup;
  fb = inject(FormBuilder);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  authService = inject(AuthService);

  token!: string;
  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    {
      validator: confirmPasswordValidator('password', 'confirmPassword'),
    })
    this.activatedRoute.params.subscribe((param) => {
      this.token = param['token'];
      console.log('Token:', this.token);
    });
  }

  reset() {
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }

    this.authService.resetPassword(resetObj)
    .subscribe({
      next: (res) => {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login'])
      },
      error: (err) => {
        alert(err.error.message);
      }
    })
  }
}
