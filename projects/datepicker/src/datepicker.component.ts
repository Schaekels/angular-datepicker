import { Component, OnInit, Input, Optional, forwardRef, Output, EventEmitter } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatepickerService, states } from './datepicker.service';

@Component({
  selector: 'date-picker',
  templateUrl: 'datepicker.component.html',
  styleUrls: [ 'datepicker.component.scss', 'assets/shared.scss' ],
  providers: [
    DatepickerService
  ]
})

export class DatepickerComponent implements OnInit {
  public state: states;
  public date = new Date();

  @Input() locale: string = 'default';
  @Output() onDateSelected = new EventEmitter<Date>();

  constructor(public picker: DatepickerService) { 
  }

  public headerClick(): void {
    this.goToPreviousState();
  }

  public yearSelected(year: number): void {
    this.date.setFullYear(year);
    this.goToNextState();
  }

  public monthSelected(month: number): void {
    this.date.setMonth(month);
    this.goToNextState();
  }

  public daySelected(day: number): void {
    this.date.setDate(day);
    this.onDateSelected.emit(this.date);
  }

  private goToNextState(): void {
    if (this.state === states.DAY) {
      return;
    } else {
      this.state++;
    }
  }

  private goToPreviousState(): void {
    if (this.state === states.YEAR) {
      return;
    } else {
      this.state--;
    }
  }

  private setInitialState(): void {
    this.state = states.DAY;
  }

  ngOnInit() {
    this.setInitialState();
  }
}


