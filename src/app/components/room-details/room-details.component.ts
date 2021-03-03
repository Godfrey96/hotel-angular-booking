import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Room } from 'src/app/model/room';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit {

  roomId: any;
  roomDetails?: Room

  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private hotelService: HotelService
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.roomId = data.id;

      this.hotelService.getRoomById(this.roomId).subscribe((roomData) => {
        this.roomDetails = roomData
        console.log('room details: ', this.roomDetails)
      })
    })
  }

  // booking(){
  //   this.router.navigate(['/booking', this.roomId]);
  // }

}
