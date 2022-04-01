import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISession } from '../core/models/session';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from './shared/authentication.service';

interface ILogin {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router
  ) {}

  getValue() {
    return JSON.stringify(this.loginForm.value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Add http login request
    console.log(this.loginForm.value);
  }

  login() {

    if(this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe({
        next: (value) => {
          this.storageService.setCurrentSession(value);
        },
        complete: () => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
