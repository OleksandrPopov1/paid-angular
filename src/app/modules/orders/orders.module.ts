import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatExpansionModule} from "@angular/material/expansion";

import {OrdersRoutingModule} from './orders-routing.module';
import {OrdersComponent} from './components/orders/orders.component';
import {OrdersTableComponent} from './components/orders-table/orders-table.component';
import {OrdersFilterInputComponent} from './components/orders-filter-input/orders-filter-input.component';
import {OrdersEditeComponent} from './components/orders-edite/orders-edite.component';
import {OrdersEditeFormComponent} from './components/orders-edite-form/orders-edite-form.component';
import {OrdersEditeAddGroupComponent} from './components/orders-edite-add-group/orders-edite-add-group.component';
import {OrdersCommentsComponent} from './components/orders-comments/orders-comments.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrdersTableComponent,
    OrdersFilterInputComponent,
    DatepickerComponent,
    OrdersEditeComponent,
    OrdersEditeFormComponent,
    OrdersEditeAddGroupComponent,
    OrdersCommentsComponent,
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule
  ]
})
export class OrdersModule {
}
