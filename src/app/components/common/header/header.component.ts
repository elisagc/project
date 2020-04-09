import { Component, OnInit, Input } from "@angular/core";
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from "angularx-social-login";
import { CommonService } from "../../../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  user: SocialUser;
  isModalOpen = false;
  title: boolean;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.showTitle.subscribe(
      showTitle => (this.title = showTitle)
    );
    console.log("EN HEADER TITLE", this.title);
    this.authService.authState.subscribe(user => {
      this.commonService.user = user;
      this.user = user;
    });
  }

  modalToggle() {
    this.isModalOpen = !this.isModalOpen;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigateByUrl("/");
  }

  backHome(): void {
    this.router.navigateByUrl("/");
  }
}
