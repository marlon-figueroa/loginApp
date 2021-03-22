import { AppComponent } from "./../../app.component";
import { AuthService } from "./../../services/auth.service";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  appname = "TIENDA DEMO";
  inLoggIn = "";
  session = "";

  constructor(
    private auth: AuthService,
    private route: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    if (localStorage.getItem("inLoggIn")) {
      this.inLoggIn = localStorage.getItem("inLoggIn");
      this.session = localStorage.getItem("session");
    }
  }

  salir() {
    this.auth.loguot();
    if (localStorage.getItem("session")) {
      if (localStorage.getItem("session") === "true") {
        localStorage.setItem("session", "false");
      }
    } else {
      localStorage.setItem("session", "false");
    }
    this.appComponent.setBeSessionActive(true);
    this.route.navigateByUrl("/login");
  }
}
