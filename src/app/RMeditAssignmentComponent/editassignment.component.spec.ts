import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditassignmentComponent } from './editassignment.component';

describe('EditassignmentComponent', () => {
  let component: EditassignmentComponent;
  let fixture: ComponentFixture<EditassignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditassignmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
