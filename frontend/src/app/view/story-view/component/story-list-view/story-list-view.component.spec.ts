import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryListViewComponent } from './story-list-view.component';

describe('StoryListViewComponent', () => {
  let component: StoryListViewComponent;
  let fixture: ComponentFixture<StoryListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
