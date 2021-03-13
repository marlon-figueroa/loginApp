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

  constructor(private auth:AuthService, private route:Router) { }

  ngOnInit() {

  }

  salir() {
    this.auth.loguot();
    this.route.navigateByUrl('/login');
  }

}
