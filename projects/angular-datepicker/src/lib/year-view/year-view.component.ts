import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DatepickerService } from '../datepicker.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'year-view',
  templateUrl: 'year-view.component.html',
  styleUrls: ['year-view.component.scss', '../assets/shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class YearViewComponent implements OnInit, OnDestroy {
  private _nextSub: Subscription;
  private _prevSub: Subscription;

  @Input() date: Date;
  @Output() onYearSelected = new EventEmitter<number>();

  public years: Array<number>;

  constructor(public picker: DatepickerService, private _cdr: ChangeDetectorRef) {
    this._nextSub = this.picker.onNext.subscribe(this.next());
    this._prevSub = this.picker.onPrevious.subscribe(this.previous());
   }

  public selectYear(year: number): void {
    this.onYearSelected.emit(year);
  }

  private next(): () => void {
    return () => {
      this.constructYearsArray(this.years[this.years.length - 1] + 1);
      this.setHeaderTitle();
      this._cdr.markForCheck();
    }
  }

  private previous(): () => void {
    return () => {
      let year = this.years[0] - 20;
      if (year <= 0 ) {
        year = 0;
      }
      this.constructYearsArray(year);
      this.setHeaderTitle();
      this._cdr.markForCheck();
    }
  }

  private calculateYearRange(): void {
    this.constructYearsArray(this.date.getFullYear() - 3);
  }

  private constructYearsArray(minYear: number): void {
    this.years = new Array<number>(16).fill(0).map((item, index) => minYear + index );
  }

  private setHeaderTitle(): void {
    this.picker.header = this.years[0] + ' - ' + this.years[this.years.length - 1];
  }

  ngOnInit() {
    this.calculateYearRange();
    this.setHeaderTitle();
  }

  ngOnDestroy() {
    this._nextSub.unsubscribe();
    this._prevSub.unsubscribe();
  }
}
