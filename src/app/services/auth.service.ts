import { UsuarioModel } from "./../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private url = "https://identitytoolkit.googleapis.com/v1";
  private apikey = "AIzaSyA6ehwhKFrhe4aGGLGGLf4Rgl8GZG3Q3eU";
  userToken: string;

  constructor(private http: HttpClient) {
    this.readToken();
  }

  loguot() {}

  //Autenticar usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  login(usr: UsuarioModel) {
    const usrData = {
      email: usr.email,
      password: usr.password,
      returnSecureToken: true,
    };

    return this.http
      .post(
        `${this.url}/accounts:signInWithPassword?key=${this.apikey}`,
        usrData
      )
      .pipe(
        map((response) => {
          this.saveToken(response["idToken"]);
        })
      );
  }

  //Registrar usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  newUser(usr: UsuarioModel) {
    const authData = {
      email: usr.email,
      password: usr.password,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}/accounts:signUp?key=${this.apikey}`, authData)
      .pipe(
        map((response) => {
          this.saveToken(response["idToken"]);
        })
      );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem("token", idToken);
  }

  readToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }
}
