import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmeviewcomponentComponent } from './smeviewcomponent.component';

describe('SmeviewcomponentComponent', () => {
  let component: SmeviewcomponentComponent;
  let fixture: ComponentFixture<SmeviewcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmeviewcomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmeviewcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
