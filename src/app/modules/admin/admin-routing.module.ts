import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from "./components/admin/admin.component";
import {AdminGuard} from "./guards";
import {AdminResolver} from "./services/resolvers/admin.resolver";
import {UsersComponent} from "./components/users/users.component";
import {OrdersStatisticComponent} from "./components/orders-statistic/orders-statistic.component";
import {OrdersStatisticResolver} from "./services/resolvers/orders-statistic.resolver";
import {
  OrdersStatisticManagerComponent
} from "./components/orders-statistic-manager/orders-statistic-manager.component";
import {OrdersStatisticManagerResolver} from "./services/resolvers/orders-statistic-manager.resolver";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    resolve: {admin: AdminResolver},
    children: [
      {path: '', redirectTo: 'users', pathMatch: 'full'},
      {path: 'users', component: UsersComponent, resolve: {users: AdminResolver}},
      {
        path: 'statistic',
        component: OrdersStatisticComponent,
        resolve: {statistic: OrdersStatisticResolver},
        children: [
          {
            path: ':managerId',
            component: OrdersStatisticManagerComponent,
            resolve: {statisticManager: OrdersStatisticManagerResolver}
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
