import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourOfHourComponent } from './four-of-hour.component';

describe('FourOfHourComponent', () => {
  let component: FourOfHourComponent;
  let fixture: ComponentFixture<FourOfHourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourOfHourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourOfHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
