import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'booking-app';
  show: boolean = false;
  name: String = "abcd";
  
  onselect(){
    this.show = true;
  }

  constructor() {}

  ngOnInit() {
   
  }
}
