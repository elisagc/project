import { Component, OnInit, Input } from "@angular/core";
import { YtPlayerService, PlayerOptions } from "yt-player-angular";
import { YoutubeService } from "src/app/services/youtube.service";

@Component({
  selector: "app-mplayer",
  templateUrl: "./mplayer.component.html",
  styleUrls: ["./mplayer.component.scss"]
})
export class MplayerComponent implements OnInit {
  constructor(private ytPlayerService: YtPlayerService) {}
  @Input() id: string[];
  @Input() imgGame: string;
  idPlaying: string;
  autoplay: boolean = true;
  countSong: number = 0;

  playerOptions: PlayerOptions = {
    autoplay: false
  };

  ngOnInit(): void {
    this.idPlaying = this.id[0];

    console.log("imgggg", this.imgGame);
    this.ytPlayerService.stateChange$.subscribe(state => {
      state.type === 3 ? this.changeSong("next") : null;
    });
  }

  playSong() {
    console.log("EL ID TIENE", this.id);
    this.ytPlayerService.play();
  }

  changeSong(id: string) {
    switch (id) {
      case "next":
        this.countSong !== this.id.length - 1 ? this.countSong++ : null;
        console.log("posicion", this.countSong);
        break;
      case "previous":
        this.countSong !== 0 ? this.countSong-- : null;
        break;
      default:
        console.log("en default");
        break;
    }
    this.changeId();
  }

  changeId() {
    this.idPlaying = this.id[this.countSong];
  }
}
