import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"]
})
export class TitleComponent implements OnInit {
  @Input() ifHaveText;
  ifInMusicPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.url === "/game-music" || this.router.url === "/privacy-policy"
      ? (this.ifInMusicPage = true)
      : (this.ifInMusicPage = false);
  }

  backToHome() {
    this.router.navigateByUrl("/");
  }
}
