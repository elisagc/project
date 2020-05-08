import { Component, OnInit, Input } from "@angular/core";
import { YtPlayerService, PlayerOptions } from "yt-player-angular";
import { YoutubeService } from "src/app/services/youtube.service";

@Component({
  selector: "app-mplayer",
  templateUrl: "./mplayer.component.html",
  styleUrls: ["./mplayer.component.scss"],
})
export class MplayerComponent implements OnInit {
  constructor(
    private ytPlayerService: YtPlayerService,
    private youtubeService: YoutubeService
  ) {}

  secondSelected;
  @Input() ids: string[];
  @Input() imgGame: string;
  idPlaying: string;
  countSong: number = 0;
  played: boolean = true;

  maxTime: number;
  timer: number;
  totalTime: number[];
  currentTime: number[];
  saveCurrentTime: number[];
  saveTimer: number;

  playerOptions: PlayerOptions = {
    autoplay: true,
  };

  ngOnInit(): void {
    this.youtubeService.getInfoVideo();
    this.idPlaying = this.ids[0];

    this.ytPlayerService.stateChange$.subscribe((state) => {
      this.timer = state.payload;

      if (!state.payload) {
        this.timer = this.saveTimer;
      }
      state.type === 3 ? this.changeSong("next") : null;
      this.maxTime = this.ytPlayerService.getDuration();
      //coge la duración total de la canción. Internar no volver a llamar hasta que haya terminado la canción:
      this.totalTime = this.setSeconds(this.maxTime);
      this.currentTime = this.setSeconds(this.timer);
      this.saveTimer = this.timer;
    });
  }

  playSong() {
    this.played = !this.played;
    this.ytPlayerService.play();
  }

  pauseSong() {
    this.saveTimer = this.timer;
    this.saveCurrentTime = this.currentTime;
    this.played = !this.played;
    this.ytPlayerService.pause();
  }

  changeSong(id: string) {
    switch (id) {
      case "next":
        this.countSong !== this.ids.length - 1 ? this.countSong++ : null;
        // console.log("posicion", this.countSong);
        break;
      case "previous":
        this.countSong !== 0 ? this.countSong-- : null;
        break;
      default:
        break;
    }
    this.changeId();
  }

  changeId() {
    this.idPlaying = this.ids[this.countSong];
  }

  setSeconds(seconds) {
    if (!seconds) {
      console.log("SECONDS EN NANNNNNNNNNN");
    }
    var hour: string | number = Math.floor(seconds / 3600);
    hour = Math.floor(seconds / 3600) < 10 ? "0" + hour : hour;
    var minute: any = Math.floor((seconds / 60) % 60);
    minute = minute < 10 ? "0" + minute : minute;
    var second: string | number = Math.trunc(seconds % 60);
    second = second < 10 ? "0" + second : second;
    return [hour, minute, second];
  }

  changeSecondSong() {
    this.saveTimer = this.timer;
    this.ytPlayerService.seek(this.secondSelected);
    this.currentTime = this.setSeconds(this.secondSelected);
  }
}
