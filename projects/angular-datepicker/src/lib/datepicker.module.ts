import { NgModule } from '@angular/core';

import { DatepickerComponent } from './datepicker.component';
import { CommonModule } from '@angular/common';
import { YearViewComponent } from './year-view/year-view.component';
import { DatepickerService } from './datepicker.service';
import { MonthViewComponent } from './month-view/month-view.compents';
import { DaysViewComponent } from './days-view/days-view.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DatepickerComponent
  ],
  declarations: [
    DatepickerComponent,
    YearViewComponent,
    MonthViewComponent,
    DaysViewComponent
  ],
  providers: [],
})
export class DatepickerModule { }
