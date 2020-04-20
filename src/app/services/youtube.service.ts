import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "./../../environments/environment";
import { CommonService } from "../services/common.service";
import { words } from "../excluded-words";

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  token = "";
  baseUrlMusic: string =
    "https://www.googleapis.com/youtube/v3/search?" + "&part=" + "id";
  baseNewUrlMusic: string =
    "https://www.youtube.com/list_ajax?style=json&action_get_templist=1&video_ids=";
  page: string = "";
  videoIds: string[];
  infoVideo;
  finalVideos;

  constructor(private http: HttpClient, private props: CommonService) {}

  getVideosForCategories(categories) {
    this.token = this.props.user.authToken;
    console.log("EL TOKEN ES:", this.token);
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

  getInfoVideo() {
    const headerWithToken = new HttpHeaders({
      "Content-Type": "application/json",
      authorization: `Bearer ${this.token}`
    });
    console.log("Video id's: ", this.videoIds);
    this.http
      .get(this.baseNewUrlMusic + this.videoIds, {
        headers: new HttpHeaders({ "sec-fetch-site": "same-site" })
      })
      .toPromise()
      .then(e => {
        //this.finalVideos = e;
        console.log(e);
      });
  }
}
