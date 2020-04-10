import { Component, OnInit } from "@angular/core";
import { YtPlayerService, PlayerOptions } from "yt-player-angular";

@Component({
  selector: "app-iframe",
  templateUrl: "./iframe.component.html",
  styleUrls: ["./iframe.component.scss"]
})
export class IframeComponent implements OnInit {
  constructor(private ytPlayerService: YtPlayerService) {}
  id = ["fJ9rUzIMcZQ", "sElE_BfQ67s", "m05-kE_tSB8", "zc_RsLOgF0g"];
  idPlaying = this.id[0];
  autoplay: boolean = true;
  countSong = 0;

  playerOptions: PlayerOptions = {
    autoplay: false
  };

  ngOnInit(): void {
    this.ytPlayerService.stateChange$.subscribe(state => {
      state.type === 3 ? this.changeSong("next") : null;
    });
  }

  playSong() {
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
