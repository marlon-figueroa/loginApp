import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "loginApp";
  beSessionActive = true;
  constructor() {}

  ngOnInit() {
    if (localStorage.getItem("session")) {
      if (localStorage.getItem("session") === "true") {
        this.beSessionActive = false;
      } else {
        this.beSessionActive = true;
      }
    }
  }

  setBeSessionActive(estado: boolean) {
    this.beSessionActive = estado;
  }
}
