import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDeleteTaskDialogComponent } from './confirmation.delete-task.dialog.component';

describe('ConfirmationDeleteTaskDialogComponent', () => {
  let component: ConfirmationDeleteTaskDialogComponent;
  let fixture: ComponentFixture<ConfirmationDeleteTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationDeleteTaskDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDeleteTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
