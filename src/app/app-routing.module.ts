import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MusicComponent } from "./pages/music/music.component";
import { SearcherComponent } from "./pages/searcher/searcher.component";
import { PolicyComponent } from "./pages/policy/policy.component";

const routes: Routes = [
  {
    path: "",
    component: SearcherComponent,
  },
  {
    path: "game-music",
    component: MusicComponent,
  },
  {
    path: "privacy-policy",
    component: PolicyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
