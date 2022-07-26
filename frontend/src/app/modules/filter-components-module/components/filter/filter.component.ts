import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @ViewChild('modalWindowBodyRef')
  modalWindowBodyRef: any;

  public showMasterInput: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void  {

  }

  public onMasterInputButtonClick(): void {
    this.showMasterInput = true;
  }

  public onMasterInputDecline(): void {
    this.showMasterInput = false;
  }

}
