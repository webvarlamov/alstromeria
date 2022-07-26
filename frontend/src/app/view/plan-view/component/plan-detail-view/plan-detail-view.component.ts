import {Component, ElementRef, OnInit} from '@angular/core';
import {DetailViewComponent} from "../../../view/component/detail-view/detail-view.component";

@Component({
  selector: 'app-plan-detail-view',
  templateUrl: './plan-detail-view.component.html',
  styleUrls: ['./plan-detail-view.component.css'],
})
export class PlanDetailViewComponent extends DetailViewComponent implements OnInit {
}
