import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/common.service";
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser,
} from "angularx-social-login";

@Component({
  selector: "app-searcher",
  templateUrl: "./searcher.component.html",
  styleUrls: ["./searcher.component.scss"],
})
export class SearcherComponent implements OnInit {
  text: boolean = false;
  focus: boolean = false;
  load: boolean;
  constructor(
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.commonService.changeShowTitle(false);
    this.authService.authState.subscribe((user) => {
      user ? (this.load = true) : (this.load = false);
      console.log(user);
    });
  }

  ifTextReceived(event) {
    this.text = event;
  }

  ifFocusReceived(event) {
    this.focus = event;
  }
}
