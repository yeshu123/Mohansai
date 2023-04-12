import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeprogramcodepopupComponent } from './smeprogramcodepopup.component';

describe('SmeprogramcodepopupComponent', () => {
  let component: SmeprogramcodepopupComponent;
  let fixture: ComponentFixture<SmeprogramcodepopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeprogramcodepopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeprogramcodepopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
