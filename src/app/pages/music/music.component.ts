import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { GameService } from "src/app/services/game.service";
import { YoutubeService } from "./../../services/youtube.service";
import { CommonService } from "./../../services/common.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"]
})
export class MusicComponent implements OnInit {
  game: any = {};
  music: any = [];
  idVideos: string[];
  categories = [];
  imgGame: string;

  constructor(
    private gameService: GameService,
    private youtubeService: YoutubeService,
    private commonService: CommonService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.commonService.changeShowTitle(true);

    if (
      this.commonService.user === undefined ||
      this.commonService.user === null
    ) {
      this.route.navigateByUrl("");
    }
    this.chargeDataApi();
  }

  chargeDataApi() {
    this.game = this.gameService.getGame();
    this.imgGame = this.game.images["large"];
    this.categories = this.gameService.getCategories();

    this.youtubeService.getVideosForCategories(this.categories).then(videos => {
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
    this.youtubeService.videoIds = this.idVideos;
  }
}
