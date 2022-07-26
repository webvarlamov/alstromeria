import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutorListViewComponent } from './task-executor-list-view.component';

describe('TaskExecutorListViewComponent', () => {
  let component: TaskExecutorListViewComponent;
  let fixture: ComponentFixture<TaskExecutorListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskExecutorListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskExecutorListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
