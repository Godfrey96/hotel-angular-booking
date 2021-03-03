import { Component, OnInit } from '@angular/core';

import { HotelService } from '../../services/hotel.service';
import { Room } from '../../model/room';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  roomLists?: Room[];

  constructor(private hotelService: HotelService) { }

  ngOnInit(): void {
    this.hotelService.getAllRooms().subscribe((data) => {
      this.roomLists = data;
      console.log('Room Lists: ', this.roomLists)
    },
      error => console.log(error)
    );
  }

}
