import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ApiGameService } from "src/app/services/api-game-service.service";
import { ApiYoutubeService } from "./../../services/api-youtube.service";

@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"]
})
export class MusicComponent implements OnInit {
  game: any = {};
  music: any = [];
  idVideos: string[] = [];
  categories = [];

  constructor(
    private apiGameService: ApiGameService,
    private apiYoutubeService: ApiYoutubeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.chargeDataApi();
  }

  chargeDataApi() {
    this.game = this.apiGameService.getGame();
    this.categories = this.apiGameService.getCategories();

    this.apiYoutubeService
      .getVideosForCategories(this.categories)
      .then(videos => {
        this.music = videos;
        this.videoIds();
      });
  }

  videoIds() {
    this.idVideos = [];
    this.music.items.map(video =>
      video.id.videoId !== undefined
        ? this.idVideos.push(video.id.videoId)
        : null
    );
  }

  iframe() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      "https://www.youtube.com/embed/VIDEO_ID?playlist=" + this.idVideos
    );
  }
}
