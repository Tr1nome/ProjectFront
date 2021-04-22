import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../service/login.service';
import { TokenServiceService } from '../../service/token-service.service';
import { Observable } from 'rxjs';
import { User } from '../../class/user';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  token: string;
  error: string;
  isConnected: boolean;

  constructor(
    private apiService: LoginService,
    private tokenService: TokenServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required],
    });
  }

  login() {
    const val = this.loginForm.value;
    if (val.username && val.password) {
      this.apiService.postCredentials(val.username, val.password)
        .subscribe((data) => {
          this.apiService.profile().subscribe(
            (user) => {
              console.log(user);
              this.router.navigate(['/profile']);            
             },
            (err) => {
              console.error(err);
            });
        },
          (err) => {
            console.error(err);
          });
    }
  }

  onLogout() {
    this.tokenService.cleanAuthorizationToken();
    this.token = null;
    return this.router.navigate(['']);
  }
}