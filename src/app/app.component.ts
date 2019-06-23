import { Component, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Another-dust';
  public model: Date;
  public firstExample: Date;

  constructor(private _cdr: ChangeDetectorRef) {
    this.model = new Date(2020, 5, 2);
  }

  public dateSelected(date: Date): void {
    this.firstExample = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  }
}
