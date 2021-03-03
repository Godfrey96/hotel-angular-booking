import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBookingsComponent } from './list-of-bookings.component';

describe('ListOfBookingsComponent', () => {
  let component: ListOfBookingsComponent;
  let fixture: ComponentFixture<ListOfBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
