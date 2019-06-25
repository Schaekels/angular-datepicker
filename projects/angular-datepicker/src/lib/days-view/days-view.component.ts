import { Component, Input, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatepickerService } from '../datepicker.service';

@Component({
  selector: 'ang-days-view',
  templateUrl: './days-view.component.html',
  styleUrls: ['./days-view.component.scss', '../assets/shared.scss']
})
export class DaysViewComponent implements OnDestroy {
  private nextSub: Subscription;
  private prevSub: Subscription;
  private pDate: Date;

  @Input()
  set date(val: Date) {
    this.pDate = val;
    this.initDaysHeaders();
    this.setTotalDaysInMonth();
    this.setHeaderTitle();
  }

  get date(): Date {
    return this.pDate;
  }
  @Input() locale: string;
  @Output() daySelected = new EventEmitter<number>();

  public daysHeaders: Array<string>;
  public days: Array<number>;
  public preDays: Array<number>;
  public afterDays: Array<number>;

  constructor(public picker: DatepickerService) {
    this.nextSub = this.picker.onNext.subscribe(this.next());
    this.prevSub = this.picker.onPrevious.subscribe(this.previous());
  }

  public afterDaySelect(day: number): void {
    const sub = this.picker.onNext.subscribe(() => {
      this.date.setDate(day);
      this.selectDay(day);
      sub.unsubscribe();
    });
    this.picker.onNext.next();
  }

  public preDaySelect(day: number): void {
    const sub = this.picker.onPrevious.subscribe(() => {
      this.date.setDate(day);
      this.selectDay(day);
      sub.unsubscribe();
    });
    this.picker.onPrevious.next();
  }

  public selectDay(day: number): void {
    this.daySelected.emit(day);
  }

  private previous(): () => void {
    return () => {
      const year = this.date.getFullYear();
      if (year === 0) {
        return;
      }

      const month = this.date.getMonth();
      if (month === 0) {
        this.date.setFullYear(year - 1, 11);
      } else {
        this.date.setMonth(month - 1);
      }
      this.setHeaderTitle();
      this.setTotalDaysInMonth();
    };
  }

  private next(): () => void {
    return () => {
      const month = this.date.getMonth();
      if (month === 11) {
        this.date.setFullYear(this.date.getFullYear() + 1, 0);
      } else {
        this.date.setMonth(month + 1);
      }
      this.setHeaderTitle();
      this.setTotalDaysInMonth();
    };
  }

  private setHeaderTitle(): void {
    const options = { month: 'short', year: 'numeric' };
    this.picker.header = this.date.toLocaleDateString(this.locale, options);
  }

  private initDaysHeaders(): void {
    this.daysHeaders = new Array<string>();
    const date = new Date();
    date.setMonth(6);
    date.setFullYear(2018);
    date.setDate(1);
    this.daysHeaders.push(date.toLocaleDateString(this.locale, { weekday: 'short' }));

    for (let i = 0; i < 6; i++) {
      date.setDate(date.getDate() + 1);
      this.daysHeaders.push(date.toLocaleDateString(this.locale, { weekday: 'short' }));
    }
    this.date.getDay();
  }

  private setTotalDaysInMonth(): void {
    this.days = new Array<number>(this.getTotalDaysInMonth(this.date)).fill(0).map((x, i) => x + (i + 1));
    this.shiftPreDays();
    this.shiftAfterDays();
  }

  private getTotalDaysInMonth(date: Date): number {
    const bufferDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return bufferDate.getDate();
  }

  private shiftPreDays(): void {
    const bufferDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    const loopCondition = bufferDate.getDay();
    bufferDate.setMonth(bufferDate.getMonth() - 1);
    const totalDays = this.getTotalDaysInMonth(bufferDate);

    this.preDays = new Array<number>();
    for (let i = 0; i < loopCondition; i++) {
      this.preDays.unshift(totalDays - i);
    }
  }

  private shiftAfterDays(): void {
    const bufferDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.days[this.days.length - 1]);
    const loopCondition = 6 - bufferDate.getDay();

    this.afterDays = new Array<number>();
    for (let i = 0; i < loopCondition; i++) {
      this.afterDays.push(i + 1);
    }
  }

  ngOnDestroy(): void {
    this.nextSub.unsubscribe();
    this.prevSub.unsubscribe();
  }
}
