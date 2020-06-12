import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"],
})
export class SearcherComponent implements OnInit {
  focus: boolean = false;

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.changeShowTitle(false);
  }

  ifFocusReceived(event) {
    this.focus = event;
  }
}
