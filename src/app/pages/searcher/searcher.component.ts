import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"]
})
export class SearcherComponent implements OnInit {
  text: boolean = false;
  focus: boolean = false;

  constructor() {}

  ngOnInit() {}

  ifTextReceived(event) {
    this.text = event;
  }

  ifFocusReceived(event) {
    this.focus = event;
  }
}
