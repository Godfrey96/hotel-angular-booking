import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AdminService } from '../../../services/admin.service';
import { Booking } from '../../../model/booking';

@Component({
  selector: 'app-list-of-bookings',
  templateUrl: './list-of-bookings.component.html',
  styleUrls: ['./list-of-bookings.component.css']
})
export class ListOfBookingsComponent implements OnInit {

  bookingLists?: Booking[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllBookings().subscribe((data) => {
      this.bookingLists = data
      console.log('BOOKING LISTS: ', this.bookingLists)
    })
  }

  deleteBooking(id: any) {
    this.adminService.deleteBooking(id).subscribe((data) => {
      console.log('booking deleted', data)
      Swal.fire({
        title: 'Are you sure you want to delete?',
        text: 'You will not be able to recover this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete!',
        cancelButtonText: 'No, keep it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire('Deleted', 'Your booking has been deleted', 'success')
        } else if (result.dismiss == Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your booking item is safe', 'error')
        }
      })

    })
  }

}
