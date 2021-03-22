

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  inLoggIn='';

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('inLoggIn')){
      this.inLoggIn = localStorage.getItem('inLoggIn');
    }
  }

}
