import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from "./components/login/login.component";
import {AuthResolver} from "./servisces/resolvers/auth.resolver";
import {ActivateComponent} from "./components/activate/activate.component";

const routes: Routes = [
  {path: '', component: LoginComponent, resolve: {login: AuthResolver}},
  {
    path: 'activate', component: ActivateComponent, children: [
      {path: ':token', component: ActivateComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}
