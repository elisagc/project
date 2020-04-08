import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class GameService {
  gameApiId = environment.gameApiId;
  baseUrlGame = "https://www.boardgameatlas.com/api/";
  game: any = {};
  categories = [];

  constructor(private http: HttpClient) {}

  getGame() {
    return this.game;
  }

  setGame(game) {
    this.game = game;
  }

  getCategories() {
    return this.categories;
  }

  setCategories(categories) {
    this.categories = categories;
  }

  getBoardGamesList(boardGame: string) {
    // si se deja la cadena vacía saca resultados por eso se pone a undefined
    if (boardGame === "") {
      boardGame = undefined;
    }
    return this.http
      .get(
        this.baseUrlGame +
          `search?name=${boardGame}&limit=10&fuzzy_match=true&client_id=${this.gameApiId}`
      )
      .toPromise()
      .then(responseData => responseData);
  }

  async getGameCategories() {
    return this.http
      .get(this.baseUrlGame + `game/categories?client_id=${this.gameApiId}`)
      .toPromise()
      .then(responseData => responseData);
  }
}
