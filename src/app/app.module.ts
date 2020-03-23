import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MusicComponent } from "./pages/music/music.component";
import { SearcherComponent } from "./pages/searcher/searcher.component";
import { FooterComponent } from "./components/common/footer/footer.component";
import { TitleComponent } from "./components/common/title/title.component";
import { InputComponent } from "./components/common/input/input.component";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angularx-social-login";
import { OauthComponent } from "./components/oauth/oauth.component";
import { LoginComponent } from "./pages/login/login.component";
import { PolicyComponent } from './pages/policy/policy.component';

//OAUTH
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "979235382039-qji5v0q632oad7l86d9sdq9mbtdthbfh.apps.googleusercontent.com"
    )
  }
]);

export function provideConfig() {
  return config;
}
//OAUTH

@NgModule({
  declarations: [
    AppComponent,
    SearcherComponent,
    MusicComponent,
    FooterComponent,
    TitleComponent,
    InputComponent,
    OauthComponent,
    LoginComponent,
    PolicyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,

    //OAUTH
    SocialLoginModule
    //OAUTH
  ],

  //OAUTH
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  //OAUTH

  bootstrap: [AppComponent]
})
export class AppModule {}
