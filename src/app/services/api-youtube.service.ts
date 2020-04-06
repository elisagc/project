import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ApiYoutubeService {
  apiKey: string = environment.youtubeApiId;
  token = "";
  baseUrlMusic: string =
    "https://www.googleapis.com/youtube/v3/search?" + "&part=" + "snippet";

  constructor(private http: HttpClient) {}

  getVideosForCategories(categories) {
    const categoriesSearch = [];
    categories.forEach(category => {
      categoriesSearch.push(category.name.replace(" ", "+"));
    });

    const url =
      this.baseUrlMusic +
      "&q=" +
      categoriesSearch.join("+") +
      "ambient+music+instrumental" +
      "&maxResults=10" +
      "&type=video" +
      "&videoCaption=none";

    const headerWithToken = new HttpHeaders({
      "Content-Type": "application/json",
      authorization: `Bearer ${this.token}`
    });

    /*  console.log(headerWithToken); */
    return this.http
      .get(url, { headers: headerWithToken })
      .toPromise()
      .then(videos => videos);
  }

  setToken(token) {
    this.token = token;
    console.log(token);
  }
}

/*

CON APIKEY

baseUrlMusic: string =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    this.apiKey +
    "&part=" +
    "snippet";

*/
