import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Subject } from 'rxjs';

@Injectable()
export class DatepickerService {
  public header: string;
  public onNext: Subject<void> = new Subject<void>();
  public onPrevious: Subject<void> = new Subject<void>();

  constructor() {}
}

export enum states {
  YEAR = 0,
  MONTH = 1,
  DAY = 2
}
