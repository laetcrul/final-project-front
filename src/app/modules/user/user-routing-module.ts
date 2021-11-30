import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AllUsersComponent} from "./pages/all-users/all-users.component";

const routes: Routes = [
  {path: "all", component: AllUsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
