import { Component, OnInit, Input } from "@angular/core";
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from "angularx-social-login";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  user: SocialUser;
  isModalOpen = false;
  @Input() title = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.userService.user = user;
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
  }

  backHome(): void {
    this.router.navigateByUrl("/");
  }
}
