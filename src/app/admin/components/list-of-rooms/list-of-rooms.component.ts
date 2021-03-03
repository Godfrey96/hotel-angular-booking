import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { AdminService } from '../../../services/admin.service';
import { Room } from '../../../model/room';

@Component({
  selector: 'app-list-of-rooms',
  templateUrl: './list-of-rooms.component.html',
  styleUrls: ['./list-of-rooms.component.css']
})
export class ListOfRoomsComponent implements OnInit {

  roomLists?: Room[];

  confirmDelete!: false;
  roomId: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllRooms().subscribe((data) => {
      this.roomLists = data
      console.log('ROOM LISTS: ', this.roomLists)
    })
  }

  deleteRoom(id: any) {
    this.adminService.deleteRoom(id).subscribe((data: Room) => {
      console.log('room deleted', data)
      Swal.fire({
        title: 'Are you sure you want to delete?',
        text: 'You will not be able to recover this item!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire('Deleted', 'Your room has been deleted', 'success')
        } else if (result.dismiss == Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your room is safe', 'error')
        }
      })

    })
  }

}
