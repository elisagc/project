import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MusicComponent } from "./pages/music/music.component";
import { SearcherComponent } from "./pages/searcher/searcher.component";
import { PolicyComponent } from "./pages/policy/policy.component";

const routes: Routes = [
  {
    path: "",
    component: SearcherComponent
  },
  {
    path: "game-music",
    component: MusicComponent,
    data: { title: "boardgame music" }
  },
  {
    path: "privacy-policy",
    component: PolicyComponent,
    data: { title: "privacy-policy" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
