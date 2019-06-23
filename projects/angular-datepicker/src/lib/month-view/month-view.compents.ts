import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DatepickerService } from '../datepicker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ang-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss', '../assets/shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonthViewComponent implements OnInit, OnDestroy {
  private nextSub: Subscription;
  private prevSub: Subscription;

  @Input() date: Date;
  @Input() locale: string;
  @Output() monthSelected = new EventEmitter<number>();

  public months: Array<Date> = new Array<Date>();

  constructor(public picker: DatepickerService) {
    this.nextSub = this.picker.onNext.subscribe(this.next());
    this.prevSub = this.picker.onPrevious.subscribe(this.previous());
  }

  public isActive(date: Date): boolean {
    return date.getMonth() === this.date.getMonth();
  }

  public toMonthString(date: Date): string {
    const options = { month: 'short' };
    return date.toLocaleDateString(this.locale, options);
  }

  public selectMonth(month: Date): void {
    this.monthSelected.emit(month.getMonth());
  }

  private next(): () => void {
    return () => {
      this.date.setFullYear(this.date.getFullYear() + 1);
      this.setHeaderTitle();
    };
  }

  private previous(): () => void {
    return () => {
      const year = this.date.getFullYear();
      if (year === 0) {
        return;
      }
      this.date.setFullYear(this.date.getFullYear() - 1);
      this.setHeaderTitle();
    };
  }

  private initializeDates(): void {
    for (let i = 0; i < 12; i++) {
      const date = new Date();
      date.setMonth(i, 1);
      this.months.push(date);
    }
  }

  private setHeaderTitle(): void {
    this.picker.header = this.date.getFullYear().toString();
  }

  ngOnInit(): void {
    this.initializeDates();
    this.setHeaderTitle();
  }

  ngOnDestroy(): void {
    this.nextSub.unsubscribe();
    this.prevSub.unsubscribe();
  }
}
