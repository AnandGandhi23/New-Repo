import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  myUsername: string = 'test@gmail.com';
  myPassword: string = 'test123';
  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  get formControls() { return this.loginForm.controls }

  ngOnInit(): void {
      this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid)
    return;

    const email = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    
    this.authService.login(email, password);
  }
}
