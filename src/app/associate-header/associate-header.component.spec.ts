import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateHeaderComponent } from './associate-header.component';

describe('AssociateHeaderComponent', () => {
  let component: AssociateHeaderComponent;
  let fixture: ComponentFixture<AssociateHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
