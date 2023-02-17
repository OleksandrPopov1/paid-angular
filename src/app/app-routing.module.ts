import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";

import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: 'orders', pathMatch: 'full'},
      {path: 'orders', loadChildren: () => import('./modules/orders/orders.module').then(value => value.OrdersModule)},
      {path: 'login', loadChildren: () => import('./modules/login/login.module').then(value => value.LoginModule)},
      {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(value => value.AdminModule)}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
