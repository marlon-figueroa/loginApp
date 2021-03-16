import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

import { UsuarioModel } from "./../../models/usuario.model";
import { AuthService } from "./../../services/auth.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.component.html",
  styleUrls: ["./registro.component.css"],
})
export class RegistroComponent implements OnInit {
  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, private route: Router) {}

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      title: "Aviso",
      icon: "info",
      text: "Espere por favor...",
    });

    Swal.showLoading();

    this.auth.newUser(this.usuario).subscribe(
      (response) => {
        console.log(response);
        if(this.recordarme){
          localStorage.setItem('email', this.usuario.email);
        }
        localStorage.setItem('inLoggIn', this.usuario.email);
        Swal.close();
        this.route.navigateByUrl("/home");
      },
      (error) => {
        Swal.fire({
          title: "Error al autenticar",
          text: error.error.error.message,
          icon: "error",
        });
      }
    );
  }
}
