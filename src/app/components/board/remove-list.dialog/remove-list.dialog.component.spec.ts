import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveListDialogComponent } from './remove-list.dialog.component';

describe('RemoveListDialogComponent', () => {
  let component: RemoveListDialogComponent;
  let fixture: ComponentFixture<RemoveListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
