import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact';
import Swal from 'sweetalert2';

import { HotelService } from '../../services/hotel.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup
  contactSubmitted!: boolean;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.addContact();
  }

  addContact(){
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z][A-Za-z -]*$')]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  submitContact(){
    this.contactSubmitted = true;
    if(this.contactForm.valid){
      this.hotelService.createContact(this.contactForm.value).subscribe((data: Contact) => {
        console.log('contacts: ', data);
        Swal.fire('Your message is sent successfully')
      });
    }else{
      console.log('Failed to submit contact form');
      Swal.fire('Failed to submit contact form')
    }
  }

}
