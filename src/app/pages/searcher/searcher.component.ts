import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"]
})
export class SearcherComponent implements OnInit {
  text = false;
  focus = false;

  constructor(private router: Router) {}

  ngOnInit() {}

  ifTextReceived(event) {
    this.text = event;
  }

  ifFocusReceived(event) {
    this.focus = event;
  }

  prueba() {
    this.router.navigateByUrl("game-music");
  }
}
