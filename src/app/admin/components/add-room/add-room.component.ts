import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Room } from '../../../model/room';
import { AdminService } from 'src/app/services/admin.service';



@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {

  addRoomForm!: FormGroup;
  roomSubmitted?: boolean;
  room?: Room;

  // selectedFile?: File = null;
  upLoadedFile: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.addRoom();
  }

  addRoom() {
    this.addRoomForm = this.fb.group({
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

  // addGroupPhotos(){
  //   return this.fb.group({
  //     room_photo: ['', Validators.required]
  //   })
  // }

  // addPhoto() {
  //   this.photosArray.push(this.addGroupPhotos());
  // }

  // removePhoto(index: number) {
  //   this.photosArray.removeAt(index);
  // }

  // get photosArray() {
  //   return <FormArray>this.addRoomForm?.get('photos');
  // }

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
        this.addRoomForm?.get('room_photo')?.setValue(this.upLoadedFile);
        console.log('photo: ', this.addRoomForm?.get('room_photo')?.value)
        // console.log('image: ', this.upLoadedFile);
      };
    }

  onSubmit() {
    this.roomSubmitted = true;
    if(this.addRoomForm?.valid){
      console.log('FORM: ', this.addRoomForm.value)
      this.adminService.addNewRoom(this.addRoomForm.value).subscribe((data: Room) => {
        console.log('Room Added: ', data);
        Swal.fire('Room added successfully')
        this.router.navigateByUrl('/list-of-rooms');
      })
    }else{
      console.log('Failed to Add a Room')
      Swal.fire('Failed to add a room')
    }
    this.addRoomForm?.reset();

    // console.log(this.addRoomForm?.value)
  }

}
