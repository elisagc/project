import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class GameService {
  gameApiId: string = environment.gameApiId;
  baseUrlGame: string = "https://www.boardgameatlas.com/api/";
  game = {};
  categories = [];

  constructor(private http: HttpClient) {}

  getBoardGamesList(boardGame: string) {
    if (!boardGame) {
      boardGame = undefined;
    }
    return this.http
      .get(
        this.baseUrlGame +
          `search?name=${boardGame}&limit=10&fuzzy_match=true&client_id=${this.gameApiId}`
      )
      .toPromise()
      .then((responseData) => responseData);
  }

  getGameCategories() {
    return this.http
      .get(this.baseUrlGame + `game/categories?client_id=${this.gameApiId}`)
      .toPromise()
      .then((responseData) => responseData);
  }
}
