import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'ngbd-datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.css'],
  providers: [NgbDatepickerConfig]
})
export class NgbdDatepickerRange implements OnInit {
  @Output() onDatePicked: EventEmitter<Array<Date>> = new EventEmitter<Array<Date>>();

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  disabledDates: Array<Date>;

  constructor(calendar: NgbCalendar, config: NgbDatepickerConfig, private toastr: ToastrService) {
    this.fromDate = calendar.getToday();

    config.minDate = calendar.getToday();
    config.maxDate = { year: 2020, month: 12, day: 31 };

    config.outsideDays = 'hidden';

    config.markDisabled = (date: NgbDateStruct) => {
      let disabled = [];

      for (let d of this.disabledDates) {
        if (d.getDate() == date.day &&
          d.getMonth() == date.month &&
          d.getFullYear() == date.year) {
          disabled.push(d);
        }
      }

      return disabled.length >= 1;
    };
  }

  ngOnInit() {
    //TODO: get data from database
    this.disabledDates = [new Date(2018, 9, 21), new Date(2018, 9, 20),];
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  onDateSelection(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    let startDate = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
    this.onDatePicked.emit([startDate]);

    if (this.fromDate && this.toDate) {
      let endDate = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
      for (let current of this.disabledDates) {
        if (startDate < current && current < endDate) {
          return this.toastr.error('On the red dates the car is not free. Please choose another period!', 'Warning!');
        }
      }
      this.onDatePicked.emit([startDate, endDate]);
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}