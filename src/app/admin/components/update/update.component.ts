import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Room } from '../../../model/room';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  updateRoomForm!: FormGroup;
  roomSubmitted?: boolean;
  room?: Room;

  roomId: any;
  roomData: any;

  // selectedFile?: File = null;
  upLoadedFile: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.roomId = data.id
      console.log('ROOM - ID: ', this.roomId)
      this.adminService.viewRoom(this.roomId).subscribe((data: Room) => {
        this.roomData = data
        console.log('ROOM - DATA: ',this.roomData)
        this.updateRoomForm.controls['room_name'].setValue(this.roomData.room_name);
        this.updateRoomForm.controls['room_bed'].setValue(this.roomData.room_bed);
        this.updateRoomForm.controls['room_price'].setValue(this.roomData.room_price);
        this.updateRoomForm.controls['room_size'].setValue(this.roomData.room_size);
        this.updateRoomForm.controls['room_capacity'].setValue(this.roomData.room_capacity);
        this.updateRoomForm.controls['room_service'].setValue(this.roomData.room_service);
        this.updateRoomForm.controls['room_description'].setValue(this.roomData.room_description);
        this.updateRoomForm.controls['room_photo'].setValue(this.roomData.room_photo);
        this.updateRoomForm.controls['number_of_room'].setValue(this.roomData.number_of_room);
      })
    })

    this.updateRoom();
  }

  updateRoom() {
    this.updateRoomForm = this.fb.group({
      room_name: ['', Validators.required],
      room_price: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      room_description: ['', Validators.required],
      room_size: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      room_capacity: ['', Validators.required],
      room_bed: ['', Validators.required],
      room_service: ['', Validators.required],
      room_photo: ['', Validators.required],
      number_of_room: ['', Validators.required]
      // photos: this.fb.array([this.addGroupPhotos()])
    })
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = (p) => {
        console.log(p);
      };
      reader.onloadend = (e) => {
        console.log(e.target);
        this.upLoadedFile = reader.result;
        console.log('updaload file: ', this.upLoadedFile)
        this.updateRoomForm?.get('room_photo')?.setValue(this.upLoadedFile);
        console.log('photo: ', this.updateRoomForm?.get('room_photo')?.value)
        // console.log('image: ', this.upLoadedFile);
      };
    }

  onSubmit(){
    this.roomSubmitted = true;
    if(this.updateRoomForm.valid){
      this.adminService.updateRoom(this.roomId, this.updateRoomForm.value).subscribe(data => {
        console.log('ROOM - UPDATED: ', data)
        Swal.fire('','Your room is updated successfully','success');
        this.router.navigateByUrl('/list-of-rooms');
      })
    }else{
      Swal.fire('Failed to update room')
    }
  }

}
