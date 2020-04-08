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
  title = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("LA RUTA ES: ", this.router.url);
    this.authService.authState.subscribe(user => {
      this.commonService.user = user;
      this.user = user;
      this.router.url === "game-music"
        ? (this.title = true)
        : (this.title = false);
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
