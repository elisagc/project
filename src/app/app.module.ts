import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MusicComponent } from "./pages/music/music.component";
import { SearcherComponent } from "./pages/searcher/searcher.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { InputComponent } from "./components/input/input.component";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
} from "angularx-social-login";
import { PolicyComponent } from "./pages/policy/policy.component";
import { HeaderComponent } from "./components/common/header/header.component";
import { environment } from "../environments/environment";
import { YtPlayerAngularModule } from "yt-player-angular";
import { MplayerComponent } from "./components/mplayer/mplayer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SpinnerComponent } from "./components/common/spinner/spinner.component";

export function provideConfig() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleIdClient),
    },
  ]);
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
    MplayerComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    SocialLoginModule,
    YtPlayerAngularModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSliderModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
