import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

import {ActivateFormComponent} from "../activate-form/activate-form.component";

@Component({
  selector: 'app-activate',
  template: ''
})
export class ActivateComponent implements OnInit {

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialog.open(ActivateFormComponent, {
      disableClose: true,
      exitAnimationDuration: '1s',
      enterAnimationDuration: '1s',
      autoFocus: false
    });
  }


}
