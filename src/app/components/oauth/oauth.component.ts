import { Component, OnInit } from "@angular/core";
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from "angularx-social-login";

import { ApiYoutubeService } from "src/app/services/api-youtube.service";
import { LogService } from "../../services/log.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-oauth",
  templateUrl: "./oauth.component.html",
  styleUrls: ["./oauth.component.scss"]
})
export class OauthComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private log: LogService,
    private apiYoutubeService: ApiYoutubeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
      this.loggedIn = user != null;
      if (this.loggedIn) {
        this.sendToken(this.user);
        this.log.setLog(true);
      } else {
        this.log.setLog(false);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.log.signOut();
  }

  sendToken(user) {
    this.apiYoutubeService.setToken(user.authToken);
    this.router.navigateByUrl("game-music");
  }
}
