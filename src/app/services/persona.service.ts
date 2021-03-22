import { delay, map } from "rxjs/operators";
import { PersonaModel } from "./../models/persona.model";
import { AuthService } from "./auth.service";
import { CONSTANTS } from "./../models/constants";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PersonaService {
  private url = CONSTANTS.getUrlBd;

  constructor(private http: HttpClient) {}

  crearPersona(persona: PersonaModel) {
    return this.http.post(`${this.url}/persona.json`, persona).pipe(
      map((resp: any) => {
        persona.id = resp.name;
        return persona;
      })
    );
  }

  actualizarPersona(persona: PersonaModel) {
    const personaTemp = {
      ...persona,
    };
    delete personaTemp.id;
    return this.http.put(`${this.url}/persona/${persona.id}.json`, personaTemp);
  }

  borrarPersona(id: string) {
    return this.http.delete(`${this.url}/persona/${id}.json`);
  }

  getPersona(id: string) {
    return this.http.get(`${this.url}/persona/${id}.json`);
  }

  getPersonas() {
    return this.http
      .get(`${this.url}/persona.json`)
      .pipe(map(this.crearArreglo), delay(0));
  }

  private crearArreglo(personasObj: object) {
    const personas: PersonaModel[] = [];
    if (personasObj) {
      Object.keys(personasObj).forEach((key) => {
        const persona: PersonaModel = personasObj[key];
        persona.id = key;
        personas.push(persona);
      });
    }
    return personas;
  }
}
