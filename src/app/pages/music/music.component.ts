import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { YoutubeService } from "./../../services/youtube.service";
import { CommonService } from "./../../services/common.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-music",
  templateUrl: "./music.component.html",
  styleUrls: ["./music.component.scss"],
})
export class MusicComponent implements OnInit {
  idVideos: string[];
  imgGame: string;
  game: any = {};
  music: any = [];
  categories = [];

  constructor(
    private gameService: GameService,
    private youtubeService: YoutubeService,
    private commonService: CommonService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.commonService.changeShowTitle(true);
    !this.commonService.user
      ? this.route.navigateByUrl("")
      : this.chargeDataApi();
  }

  chargeDataApi() {
    this.game = this.gameService.game;
    this.imgGame = this.game.images["large"];
    this.categories = this.gameService.categories;
    this.youtubeService
      .getVideosForCategories(this.categories)
      .then((videos) => {
        this.music = videos;
        this.videoIds();
      });
  }

  videoIds() {
    this.idVideos = [];
    this.music.items.map((video) => {
      if (video.id.videoId !== undefined) {
        this.idVideos.push(video.id.videoId);
      }
    });
    this.youtubeService.videoIds = this.idVideos;
  }
}
