import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import {ToastrNotificationService} from '../service/toastr.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo, private router: Router, private toastr: ToastrNotificationService, 
    private toastrService: ToastrService) { }

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public login(email: String, password: String) {
    const query = gql`
    query login($email: String!, $password: String!)
    {
      login(email: $email, password: $password)
      {
        token
        userId
        tokenExpiration
      }
    }`;

    this.apollo.watchQuery<any>({
      query: query, 
        variables: {
          "email": email,
          "password": password
      }
    }).valueChanges
    .subscribe(({data,loading})=>{
      localStorage.setItem('accessToken', data.login.token);
      localStorage.setItem('userId', data.login.userId);
      this.loggedIn.next(true);
      this.router.navigateByUrl('/Home');
    }, (err)=> {
      console.log(err);
      this.toastrService.error(err, "Invalid");
    });
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.clear();
    this.router.navigateByUrl('/Auth');
  }
}