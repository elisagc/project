import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MusicComponent } from "./pages/music/music.component";
import { SearcherComponent } from "./pages/searcher/searcher.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { InputComponent } from "./components/common/input/input.component";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  LoginOpt
} from "angularx-social-login";
import { PolicyComponent } from "./pages/policy/policy.component";
import { HeaderComponent } from "./components/common/header/header.component";
import { environment } from "../environments/environment";
import { YtPlayerAngularModule } from "yt-player-angular";
import { MplayerComponent } from "./components/common/mplayer/mplayer.component";

// OAUTH

const googleLoginOptions: LoginOpt = {
  scope: "profile email https://www.googleapis.com/auth/youtube"
};

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      environment.googleIdClient,
      googleLoginOptions
    )
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SearcherComponent,
    MusicComponent,
    FooterComponent,
    InputComponent,
    PolicyComponent,
    HeaderComponent,
    MplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    YtPlayerAngularModule
  ],

  // OAUTH
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}
