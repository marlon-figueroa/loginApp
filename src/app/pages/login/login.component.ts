import { AppComponent } from "./../../app.component";
import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UsuarioModel } from "./../../models/usuario.model";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;
  appname = "Tienda Demo";

  constructor(
    private auth: AuthService,
    private route: Router,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if (localStorage.getItem("email")) {
      this.usuario.email = localStorage.getItem("email");
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: "Aviso",
      icon: "info",
      text: "Espere por favor...",
    });

    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(
      (response) => {
        console.log(response);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem("email", this.usuario.email);
        }
        localStorage.setItem("inLoggIn", this.usuario.email);
        localStorage.setItem("session", "true");
        this.appComponent.setBeSessionActive(false);
        this.route.navigateByUrl("/main");
      },
      (error) => {
        console.log(error.error.error.message);
        Swal.fire({
          title: "Error al autenticar",
          text: error.error.error.message,
          icon: "error",
        });
      }
    );
  }
}
