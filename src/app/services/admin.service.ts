import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Room } from '../model/room';
import { Booking } from '../model/booking';

import { roomURL, bookingURL, paymentURL } from '../config/api';
import { Payment } from '../model/payment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  room?: Room[];
  booking?: Booking;
  payment?: Payment;

  constructor(private http: HttpClient) { }

  //  Adding new room
  addNewRoom(room: Room){
    return this.http.post(roomURL, room, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Get all rooms
  getAllRooms(): Observable<Room[]>{
    return this.http.get<Room[]>(roomURL);
  }

  // Get all bookings
  getAllBookings(): Observable<Payment[]>{
    return this.http.get<Payment[]>(paymentURL);
  }

  // View room
  viewRoom(roomId: any): Observable<Room>{
    return this.http.get<Room>(`${roomURL}/${roomId}`);
  }

  // Update room
  updateRoom(roomId: any, room: any): Observable<Room>{
    return this.http.put<Room>(`${roomURL}/${roomId}`, room, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Delete room
  deleteRoom(roomId: number): Observable<Room>{
    return this.http.delete<Room>(`${roomURL}/${roomId}`);
  }

  // Delete booking
  deleteBooking(bookingId: number): Observable<Booking>{
    return this.http.delete<Booking>(`${paymentURL}/${bookingId}`);
  }

}
