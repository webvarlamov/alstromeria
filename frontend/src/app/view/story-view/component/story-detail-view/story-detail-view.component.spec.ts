import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryDetailViewComponent } from './story-detail-view.component';

describe('StoryDetailViewComponent', () => {
  let component: StoryDetailViewComponent;
  let fixture: ComponentFixture<StoryDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoryDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
