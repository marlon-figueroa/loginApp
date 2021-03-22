import { PersonaService } from "./../../../services/persona.service";
import { PersonaModel } from "./../../../models/persona.model";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { Observable } from "rxjs";

@Component({
  selector: "app-persona-detail",
  templateUrl: "./persona-detail.component.html",
  styleUrls: ["./persona-detail.component.css"],
})
export class PersonaDetailComponent implements OnInit {
  persona: PersonaModel = new PersonaModel();

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id !== "nuevo") {
      this.personaService.getPersona(id).subscribe((resp: PersonaModel) => {
        this.persona = resp;
        this.persona.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;
    if ( this.persona.id ) {
      peticion = this.personaService.actualizarPersona( this.persona );
    } else {
      peticion = this.personaService.crearPersona( this.persona );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.persona.nombres,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

      this.router.navigateByUrl('/persona');

    });
  }
}
