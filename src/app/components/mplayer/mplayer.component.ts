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

  //
  maxTime: number;
  totalTime: number[];

  //timer 5465465, se guarda en savetimer porque al pausar es Nan
  timer: number;
  saveTimer: number = 0; // si lo inicializo a 0 no se mueve la barra

  //tiempo actual en h:m:s, se tiene que guardar para pintar en el dom el tiempo pausado en h:m:s, si no es nan
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
        this.maxTime = this.ytPlayerService.getDuration(); // tiempo maximo de la cancion 3215645654567
        this.totalTime = this.setSeconds(this.ytPlayerService.getDuration()); // seteo los seg 00:05:45;
      }

      if (state.type === 5) {
        this.timer = state.payload; // 5645645684 se
        this.currentTime = this.setSeconds(this.timer); // guardo los segundos según cambian ya seteados

        // guardo el payload porque cuando no se reproduce la canción es NaN
        this.saveTimer = this.timer;
      } else if (state.type === 1) {
        this.changeSong("next");
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
