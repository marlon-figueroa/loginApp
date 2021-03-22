import { CONSTANTS } from './../models/constants';
import { UsuarioModel } from "./../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private url = CONSTANTS.getUrlBase;
  private apikey = CONSTANTS.getApiKey;
  userToken: string;

  constructor(private http: HttpClient) {
    this.readToken();
  }

  //Cerrar sesion
  loguot() {
    localStorage.removeItem("token");
  }

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
    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem("expiry", hoy.getTime().toString());
  }

  readToken() {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    } else {
      this.userToken = "";
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expiry = Number(localStorage.getItem("expiry"));
    let expiryDate = new Date();
    expiryDate.setTime(expiry);

    if (expiryDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }
}
