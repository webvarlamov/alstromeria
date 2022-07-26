import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldsetComponent implements OnInit, OnChanges {
  @Input()
  public legend: string = 'Легенда'

  public collapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public onFieldsetCollapseExpandButtonClick(): void {
    this.collapsed = !this.collapsed;
  }

  public setCollapsed(value: boolean): void {
    this.collapsed = value;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }
}
