import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Room } from 'src/app/model/room';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchRoomForm!: FormGroup

  roomLists?: Room[];

  datePickerConfig: Partial<BsDatepickerConfig>;
  minDate: Date;
  // maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService
    ) {
    this.datePickerConfig = Object.assign({
      containerClass: 'theme-dark-blue',
      dateInputFormat: 'DD/MM/YYYY',
      showWeekNumbers: false
    });
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit(): void {
    this.hotelService.getAllRooms().subscribe((data) => {
      this.roomLists = data;
      console.log('Room Lists: ', this.roomLists)
    },
      error => console.log(error)
    );

    this.searchDate();
  }

  searchDate() {
    this.searchRoomForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    })
  }

  searchHotel(){
    console.log('date searched')
  }

}
