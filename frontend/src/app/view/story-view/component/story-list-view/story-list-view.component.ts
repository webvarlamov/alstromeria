import { Component, OnInit } from '@angular/core';
import {ListViewComponent} from "../../../view/component/list-view/list-view.component";

@Component({
  selector: 'app-story-list-view',
  templateUrl: './story-list-view.component.html',
  styleUrls: ['./story-list-view.component.css'],
})
export class StoryListViewComponent extends ListViewComponent<any> implements OnInit {

  ngOnInit(): void {
  }

}
