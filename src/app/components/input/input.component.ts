import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { GameService } from "../../services/game.service";
import { CommonService } from "../../services/common.service";
@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
})
export class InputComponent implements OnInit {
  gameList = [] as any;
  gameSelected: string = "";
  categories = [] as any;

  @Output() ifFocus: EventEmitter<boolean> = new EventEmitter();

  text: string = "";
  haveText: boolean = false;
  isFocus: boolean = false;
  inputRadius: boolean = true;

  constructor(
    private gameService: GameService,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit() {
    this.gameService
      .getGameCategories()
      .then((gameCategories) => (this.categories = gameCategories));
  }

  getBoardGameList(event: Event) {
    const game = event.target as HTMLInputElement;
    this.gameService.getBoardGamesList(game.value).then((list) => {
      this.gameList = list;
      this.text === "" ? (this.inputRadius = true) : (this.inputRadius = false);
    });
  }

  selectGame(game) {
    !this.commonService.user ? alert("Please, log in") : null;
    this.gameSelected = game;
    this.getCategoriesGame(this.gameSelected);
    this.gameService.game = this.gameSelected;
    this.router.navigateByUrl("game-music");
  }

  getCategoriesGame(game) {
    const { categories } = this.categories;
    const names = [];
    game.categories.forEach((gameCategory) => {
      names.push(
        categories.find((category) => category.id === gameCategory.id)
      );
    });
    this.gameService.categories = names;
  }

  onText() {
    this.text === "" ? (this.haveText = false) : (this.haveText = true);
  }

  onFocus() {
    this.isFocus = true;
    this.ifFocus.emit(this.isFocus);
  }
}
