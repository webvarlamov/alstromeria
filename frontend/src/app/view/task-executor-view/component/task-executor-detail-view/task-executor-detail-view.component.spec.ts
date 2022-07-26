import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutorDetailViewComponent } from './task-executor-detail-view.component';

describe('TaskExecutorDetailViewComponent', () => {
  let component: TaskExecutorDetailViewComponent;
  let fixture: ComponentFixture<TaskExecutorDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskExecutorDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskExecutorDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
