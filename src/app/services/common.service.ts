import { Injectable } from "@angular/core";
import { SocialUser } from "angularx-social-login";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  user: SocialUser;
  showTitle = new BehaviorSubject<boolean>(false);
  title: Observable<boolean> = this.showTitle.asObservable();

  constructor() {}

  changeShowTitle(title: boolean) {
    this.showTitle.next(title);
  }
}
