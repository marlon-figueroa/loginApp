import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

import { PersonaModel } from "./../../models/persona.model";
import { PersonaService } from "./../../services/persona.service";

@Component({
  selector: "app-persona",
  templateUrl: "./persona.component.html",
  styleUrls: ["./persona.component.css"],
})
export class PersonaComponent implements OnInit {
  personas: PersonaModel[] = [];
  cargando = false;

  config: any;
  collection = { count: 0, data: [] }

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.cargando = true;
    this.personaService.getPersonas().subscribe((resp) => {
      this.personas = resp;
      this.cargando = false;
    });
    this.collection.data = this.personas;
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.data.length
    };
  }

  borrarPersona(persona: PersonaModel, i: number) {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Está seguro que desea borrar a ${persona.nombres}`,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
    }).then((resp) => {
      if (resp.value) {
        this.personas.splice(i, 1);
        this.personaService.borrarPersona(persona.id).subscribe();
      }
    });
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

}
