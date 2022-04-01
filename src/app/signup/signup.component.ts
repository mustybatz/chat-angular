import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../core/services/storage.service';
import { AuthenticationService } from '../login/shared/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = this.fb.group({
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
    return JSON.stringify(this.signupForm.value);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // Add http login request
    console.log(this.signupForm.value);
  }

  signup() {

    if(this.signupForm.valid) {
      this.authenticationService.signup(this.signupForm.value).subscribe({
        complete: () => {
          this.storageService.setCurrentSession(this.signupForm.value);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
