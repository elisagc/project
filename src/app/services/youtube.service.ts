import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { CommonService } from "../services/common.service";
import { words } from "../excluded-words";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  apiKey: string = environment.youtubeApiId;
  token = "";
  baseUrlMusic: string =
    "https://www.googleapis.com/youtube/v3/search?" + "&part=" + "snippet";
  page: string = "";
  constructor(private http: HttpClient, private props: CommonService) {}

  getVideosForCategories(categories) {
    this.token = this.props.user.authToken;
    const categoriesSearch = [];
    categories.forEach(category => {
      if (!words.includes(category.name)) {
        categoriesSearch.push(category.name.replace(" ", "+"));
      }
    });

    const url =
      this.baseUrlMusic +
      "&q=" +
      categoriesSearch.join("+") +
      "+ambient+music+instrumental" +
      "&maxResults=10" +
      "&type=video" +
      "&videoCaption=none";

    const headerWithToken = new HttpHeaders({
      "Content-Type": "application/json",
      authorization: `Bearer ${this.token}`
    });

    return this.http
      .get(url, { headers: headerWithToken })
      .toPromise()
      .then(videos => videos);
  }
}
