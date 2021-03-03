import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Room } from '../model/room';
import { Booking } from '../model/booking';
import { Payment } from '../model/payment';
import { Contact } from '../model/contact';

import { roomURL, bookingURL, paymentURL, contactURL } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  room?: Room[];

  constructor(private http: HttpClient) { }

  // Get all rooms
  getAllRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(roomURL);
  }

  // Get room by id to see room details
  getRoomById(id: number){
    return this.http.get(`${roomURL}/${id}`);
  }

  // Add a new booking
  addNewBooking(booking: Booking){
    return this.http.post(bookingURL, booking, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

   // Get booking by id to see booking details
   getBookingById(id: number){
    return this.http.get(`${bookingURL}/${id}`);
  }

  // Add a new payment
  addPayment(payment: Payment){
    return this.http.post(paymentURL, payment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

   // Get booking by id to see booking details
   getPaymentById(id: number){
    return this.http.get(`${paymentURL}/${id}`);
  }

  // Get all rooms
  getAllPayments(): Observable<Room[]>{
    return this.http.get<Payment[]>(paymentURL);
  }

  createContact(contact: Contact){
    return this.http.post(contactURL, contact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateRoomField(id: any, field: any){
    return this.http.patch(`${roomURL}/${id}`, field, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  // updateRoomField(id: any, field: any){
  //   return this.http.put(`${roomURL}/${id}`, field, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  // }

}
