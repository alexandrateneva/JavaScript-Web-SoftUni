import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentService } from '../../../core/services/rent.service';

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

  constructor(
    calendar: NgbCalendar,
    config: NgbDatepickerConfig,
    private toastr: ToastrService,
    private rentService: RentService,
    private route: ActivatedRoute
  ) {
    this.fromDate = calendar.getToday();

    config.minDate = calendar.getToday();
    config.maxDate = { year: 2020, month: 12, day: 31 };

    config.outsideDays = 'hidden';

    config.markDisabled = (date: NgbDateStruct) => {
      let disabled = [];

      for (let d of this.disabledDates) {
        if (d.getDate() == date.day &&
          d.getMonth() + 1 == date.month &&
          d.getFullYear() == date.year) {
          disabled.push(d);
        }
      }

      return disabled.length >= 1;
    };
  }

  ngOnInit() {
    let carId = this.route.snapshot.params['id'];
    this.rentService.getByCarId(carId).subscribe(rents => {
      let currentDisabledDates = [];
      for (let rent of rents) {
        let startDate = new Date(rent.startDate);
        let endDate = new Date(rent.endDate);

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          let currentDay = new Date(d);
          currentDisabledDates.push(currentDay);
        }
      }
      this.disabledDates = currentDisabledDates;
    })
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

    let startDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day);
    this.onDatePicked.emit([startDate]);

    if (this.fromDate && this.toDate) {
      let endDate = new Date(this.toDate.year, this.toDate.month - 1, this.toDate.day);
      for (let current of this.disabledDates) {
        if (startDate <= current && current <= endDate) {
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