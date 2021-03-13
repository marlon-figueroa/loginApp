import { AuthService } from "./../../services/auth.service";
import { UsuarioModel } from "./../../models/usuario.model";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

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

    this.auth.newUser(this.usuario).subscribe(
      (response) => {
        console.log(response);
        this.route.navigateByUrl("/home");
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
