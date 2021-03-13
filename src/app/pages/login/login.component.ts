import { Component, OnInit } from "@angular/core";
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

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
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
        this.route.navigateByUrl("/home");
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
