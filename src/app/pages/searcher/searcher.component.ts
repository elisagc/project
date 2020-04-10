import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"]
})
export class SearcherComponent implements OnInit {
  text = false;
  focus = false;

  constructor(private router: Router, private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.changeShowTitle(false);
  }

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
