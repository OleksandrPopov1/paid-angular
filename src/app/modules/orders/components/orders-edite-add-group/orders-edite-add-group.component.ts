import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

import {GroupsService} from "../../services";


@Component({
  selector: 'app-orders-edite-add-group',
  templateUrl: './orders-edite-add-group.component.html',
  styleUrls: ['./orders-edite-add-group.component.css']
})
export class OrdersEditeAddGroupComponent implements OnInit {
  form: FormGroup;

  @Output()
  newGroup = new EventEmitter<string>();

  constructor(private groupsService: GroupsService, private matDialogRef: MatDialogRef<OrdersEditeAddGroupComponent>) {
  }

  ngOnInit() {
    this._initialForm();
  }

  _initialForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required, Validators.minLength(4), Validators.maxLength(128)
      ])
    })
  }

  addGroup(): void {
    this.newGroup.emit(this.form.value.name);
    this.groupsService.create(this.form.value).subscribe(value => {
      this.groupsService.addNewGroup(value);
    });

    this.matDialogRef.close();
  }

  closeDialog(): void {
    this.newGroup.emit(undefined);
    this.matDialogRef.close();
  }

}
