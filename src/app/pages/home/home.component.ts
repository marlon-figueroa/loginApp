import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  appname='Tienda Demo';
  inLoggIn='';

  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit() {
    if(localStorage.getItem('inLoggIn')){
      this.inLoggIn = localStorage.getItem('inLoggIn');
    }
  }

  salir() {
    this.auth.loguot();
    this.route.navigateByUrl('/login');
  }

}
