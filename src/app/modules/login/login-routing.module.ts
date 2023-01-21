import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {AuthResolver} from "./servisces/resolvers/auth.resolver";

const routes: Routes = [
  {path: '', component: LoginComponent, resolve: {login: AuthResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
