import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RMSMEViewComponent } from './rmsmeview.component';

describe('RMSMEViewComponent', () => {
  let component: RMSMEViewComponent;
  let fixture: ComponentFixture<RMSMEViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RMSMEViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RMSMEViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
