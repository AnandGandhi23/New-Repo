import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Observable } from 'rxjs';

import * as $ from 'jquery';

function toggleActiveClass() {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
}

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
    isLoggedIn$ : Observable<boolean>;
    constructor(private authService: AuthService) {}

    ngOnInit() {
        toggleActiveClass();
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }

    logout()
    {
        this.authService.logout();
    }
}