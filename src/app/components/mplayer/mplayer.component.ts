import { Component, OnInit, Input } from "@angular/core";
import { YtPlayerService, PlayerOptions } from "yt-player-angular";

@Component({
  selector: "app-mplayer",
  templateUrl: "./mplayer.component.html",
  styleUrls: ["./mplayer.component.scss"],
})
export class MplayerComponent implements OnInit {
  constructor(private ytPlayerService: YtPlayerService) {}

  @Input() ids: string[];
  @Input() imgGame: string;

  idPlaying: string;
  countSong: number = 0;

  maxTime: number;
  totalTime: number[];

  timer: number;
  saveTimer: number;

  currentTime: number[];
  saveCurrentTime: number[];

  secondSelected: number;
  played: boolean = true;
  loaded: boolean = false;

  playerOptions: PlayerOptions = {
    autoplay: true,
  };

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.idPlaying = this.ids[0];
    this.ytPlayerService.stateChange$.subscribe((state) => {
      if (state.type === 5 && this.timer > 0) {
        this.loaded = true;
      }
      if (state.type === 3) {
        this.changeSong("next");
      }
      if (state.type === 4) {
        this.maxTime = this.ytPlayerService.getDuration();
        this.totalTime = this.setSeconds(this.ytPlayerService.getDuration());
      }
      if (state.type === 5) {
        this.timer = state.payload;
        this.currentTime = this.setSeconds(this.timer);
        this.saveTimer = this.timer;
      }
    });
  }

  playSong() {
    this.played = !this.played;
    this.ytPlayerService.play();
  }

  pauseSong() {
    this.saveCurrentTime = this.currentTime;
    this.played = !this.played;
    this.ytPlayerService.pause();
  }

  changeSong(id: string) {
    switch (id) {
      case "next":
        this.countSong !== this.ids.length - 1 ? this.countSong++ : null;
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
    let hour: string | number = Math.floor(seconds / 3600);
    let minute: string | number = Math.floor((seconds / 60) % 60);
    let second: any = Math.floor(seconds % 60);
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    return [hour, minute, second];
  }

  changeSecondSong() {
    this.saveTimer = this.timer;
    this.ytPlayerService.seek(this.secondSelected);
    this.currentTime = this.setSeconds(this.secondSelected);
  }
}
