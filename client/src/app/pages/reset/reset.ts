import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  token!: string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.token = param['token'];
      console.log('Token:', this.token);
    });
  }

  reset() {}
}
