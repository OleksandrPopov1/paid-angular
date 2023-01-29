import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  range: FormGroup;
  allParams: Params;
  startValue: string;
  endValue: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.allParams = params;
      this.startValue = params['start_date'] ?? '';
      this.endValue = params['end_date'] ?? '';

      if (!this.endValue && this.range) {
        this.range.reset();
      }
    });

    this._initialForm();
  }

  ngAfterViewInit() {
    this.range.valueChanges.subscribe(value => {
      if (!!value.start && !!value.end) {
        const start_date = this.range.value.start.toLocaleDateString('en-GB').split('/').reverse().join('/').replaceAll('/', '-');
        const end_date = this.range.value.end.toLocaleDateString('en-GB').split('/').reverse().join('/').replaceAll('/', '-');
        this.router.navigate([], {queryParams: {...this.allParams, start_date, end_date, page: 1}});
      }
    })
  }

  _initialForm(): void {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(new Date(this.startValue) ?? null),
      end: new FormControl<Date | null>(new Date(this.endValue) ?? null)
    })
  }

}
