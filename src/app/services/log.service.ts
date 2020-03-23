import { Injectable } from "@angular/core";
import { AuthService } from "angularx-social-login";

@Injectable({
  providedIn: "root"
})
export class LogService {
  isLogged: boolean = false;
  constructor(private authService: AuthService) {}

  setLog(log) {
    this.isLogged = log;
  }

  getLog() {
    return this.isLogged;
  }

  signOut(): void {
    this.authService.signOut();
  }
}
