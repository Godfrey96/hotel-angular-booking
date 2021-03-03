import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import Swal from 'sweetalert2';

import { Room } from 'src/app/model/room';
import { Booking } from 'src/app/model/booking';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookingForm!: FormGroup;

  datePickerConfig: Partial<BsDatepickerConfig>;
  minDate: Date;

  roomId: any;
  roomDetails?: Room
  room_name?: string;
  room_price?: any;
  room_photo?: string;
  room_capacity?: any;
  number_of_room?: any = 0;
  total_room: any = 0;
  status: string = 'NotApproved'

  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelService: HotelService,
              private fb: FormBuilder
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
    this.activatedRoute.params.subscribe(data => {
      this.roomId = data.id;

      this.hotelService.getRoomById(this.roomId).subscribe((roomData) => {
        this.roomDetails = roomData;
        this.room_name = this.roomDetails.room_name;
        this.room_price = this.roomDetails.room_price;
        this.room_photo = this.roomDetails.room_photo;
        this.room_capacity = this.roomDetails.room_capacity;
        this.number_of_room = this.roomDetails.number_of_room;
        console.log('no. rooms: ', this.number_of_room)
      }, error => console.log(error));
    }, error => console.log(error));
    this.addBooking();
  }

  addBooking(){
    this.bookingForm = this.fb.group({
      roomId: [Validators.required],
      room_name: [Validators.required],
      room_price: [Validators.required],
      room_photo: [Validators.required],
      room_capacity: [Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      adults: ['', Validators.required],
      children: ['', Validators.required]
    });
  }

  submitBooking(){
    // console.log('room id: ', this.roomId);
    // console.log('room price: ', this.room_price)
    // this.total_room = this.total_room + this.room_price
    // console.log('total: ', this.total_room)
    // console.log('total: ', 1 + 2)
    console.log('no. rooms: ', this.number_of_room)
    this.number_of_room = this.number_of_room - 1;

    this.bookingForm!.value.roomId = this.roomId;
    this.bookingForm!.value.room_name = this.room_name;
    this.bookingForm!.value.room_price = this.room_price;
    this.bookingForm!.value.room_photo = this.room_photo;
    this.bookingForm!.value.room_capacity = this.room_capacity;
    this.bookingForm!.value.number_of_room = this.number_of_room;
    this.bookingForm!.value.status = this.status;


    if(this.bookingForm!.valid){
      this.hotelService.addNewBooking(this.bookingForm!.value).subscribe((data: Booking) => {
        console.log('Booking Added: ', data);
        Swal.fire('Hi','We have received your booking','success')
        this.router.navigate(['/complete-booking', data.id]);
      });
      this.hotelService.updateRoomField(this.roomId, this.bookingForm.value.number_of_room).subscribe((data: Room) => {
        console.log('room no: ', this.bookingForm.value.number_of_room)
      })
    }else{
      console.log('Failed to make a booking')
      Swal.fire('Failed to make a booking')
    }
    this.bookingForm?.reset();
    // console.log(this.bookingForm?.value);
  }

}
