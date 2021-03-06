import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommonService } from "../services/common.service";
import { words } from "../excluded-words";

@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  token = "";
  baseUrlMusic: string =
    "https://www.googleapis.com/youtube/v3/search?" + "&part=" + "id";
  videoIds: string[];

  constructor(private http: HttpClient, private props: CommonService) {}

  getVideosForCategories(categories) {
    this.token = this.props.user.authToken;
    const categoriesSearch = [];
    categories.forEach((category) => {
      if (!words.includes(category.name)) {
        categoriesSearch.push(category.name.replace(" ", "+"));
      }
    });

    const url =
      this.baseUrlMusic +
      "&q=" +
      categoriesSearch.join("+") +
      "+ambient+music+instrumental" +
      "&maxResults=20" +
      "&type=video" +
      "&videoCaption=none" +
      "&videoDuration=medium";

    const headerWithToken = new HttpHeaders({
      "Content-Type": "application/json",
      authorization: `Bearer ${this.token}`,
    });

    return this.http
      .get(url, { headers: headerWithToken })
      .toPromise()
      .then((videos) => videos);
  }
}
