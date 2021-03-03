import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig, MonthPickerComponent, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';


import { HotelService } from 'src/app/services/hotel.service';

import { Booking } from '../../model/booking';
import { Payment } from 'src/app/model/payment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm!: FormGroup;

  bookingId: any;
  bookingDetails?: Booking;
  adults?: any;
  adult: any;
  child: any;
  children?: any;
  room_price?: any;
  total: any = 0;
  vatTotal: any;
  numOfGuests: any = 0;
  checkIn?: Date;
  email?: string;
  room_name?: string;
  checkOut?: Date;
  firstName?: string;
  lastName?: string;
  refNumber?: any;
  status: string = 'Approved'

  bsValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';

  datePickerConfig: Partial<BsDatepickerConfig>;
  // minDate: Date;
  minMonth: Date;
  mobile: string | undefined;

  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelService: HotelService,
              private fb: FormBuilder
            ) {
              this.datePickerConfig = Object.assign({},
                {
                  containerClass: 'theme-dark-blue',
                  dateInputFormat: 'MM/YYYY',
                  //selectDay: false,
                  minMode: this.minMode
                  //showWeekNumbers: false
                });
              this.minMonth = new Date();
              this.minMonth.setMonth(this.minMonth.getMonth());
            }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.bookingId = data.id;
      console.log('BOOKING ID: ', this.bookingId)

      this.hotelService.getBookingById(this.bookingId).subscribe((bookData) => {
        this.bookingDetails = bookData;

        this.adults = this.bookingDetails.adults;
        this.children = this.bookingDetails.children;
        this.room_price = this.bookingDetails.room_price;

        this.room_name = this.bookingDetails.room_name;
        this.email = this.bookingDetails.email;;
        this.mobile = this.bookingDetails.mobile;;
        this.checkIn = this.bookingDetails.checkIn;
        this.checkOut = this.bookingDetails.checkOut;
        this.firstName = this.bookingDetails.firstName;
        this.lastName = this.bookingDetails.lastName;
        // status?: 'pending';
      });
    });
    this.confirmBooking();
  }

  confirmBooking(){
    this.paymentForm = this.fb.group({
      bookignId: [Validators.required],
      adults: [Validators.required],
      children: [Validators.required],
      price: [Validators.required],
      checkIn: [Validators.required],
      checkOut: [Validators.required],
      firstName: [Validators.required],
      lastName: [Validators.required],
      email: [Validators.required],
      room_name: [Validators.required],
      // total: [Validators.required],
      // refNumber: [Validators.required],

      cardHolder: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvvNumber: ['', Validators.required]
    });
  }


  completeBooking(){

    // determining the reference number
    this.refNumber = Math.floor(Math.random()*9000000000) + 10000;

    // calculating the total price of the room depending on the number of guests
    this.adult = this.adults * this.room_price;
    this.child = this.children * this.room_price;
    this.total = this.total + this.child;
    // this.total = this.adult + this.child;

    // number of guests making a booking
    this.numOfGuests = this.adults * 1 + this.children * 1;


    this.paymentForm!.value.bookingId = this.bookingId;
    this.paymentForm!.value.adults = this.adults;
    this.paymentForm!.value.children = this.children;
    this.paymentForm!.value.room_price = this.room_price;
    this.paymentForm!.value.checkIn = this.checkIn;
    this.paymentForm!.value.checkOut = this.checkOut;
    this.paymentForm!.value.firstName = this.firstName;
    this.paymentForm!.value.lastName = this.lastName;
    this.paymentForm!.value.email = this.email;
    this.paymentForm!.value.mobile = this.mobile;
    this.paymentForm!.value.room_name = this.room_name;
    this.paymentForm!.value.total = this.total;
    this.paymentForm!.value.refNumber = this.refNumber;
    this.paymentForm!.value.numOfGuests = this.numOfGuests;
    this.paymentForm!.value.status = this.status;
    // this.paymentForm!.value.status = this.status;

    if(this.paymentForm!.valid){
      this.hotelService.addPayment(this.paymentForm!.value).subscribe((data: Payment) => {
        console.log('Payment Added: ', data);
        console.log('dddd: ', this.bookingId);
        this.router.navigate(['/booking-details', this.bookingId]);
      });
    }else{
      console.log('Failed to make a payment');
    }

    // console.log(this.paymentForm!.value)
  }

}
