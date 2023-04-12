import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsmeeditComponent } from './rmsmeedit.component';

describe('RmsmeeditComponent', () => {
  let component: RmsmeeditComponent;
  let fixture: ComponentFixture<RmsmeeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmsmeeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmsmeeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
