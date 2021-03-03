import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { HotelService } from '../../services/hotel.service';
import { Payment } from '../../model/payment';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  paymentId: any;
  paymentDetails?: Payment;
  adults?: any;
  children?: any;
  price: any;

  constructor(
              private hotelService: HotelService,
              private activatedRoute: ActivatedRoute
            ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.paymentId = data.id;
      console.log('Payment IDD: ', this.paymentId)

      this.hotelService.getPaymentById(this.paymentId).subscribe((paymentData) => {
        this.paymentDetails = paymentData;
        console.log('Payment Details: ', this.paymentDetails);

        this.adults = this.paymentDetails.adults;
        this.children = this.paymentDetails.children;
        this.price = this.paymentDetails.room_price;
      });
    });
  }

  // Open pdf
  openPdf(){

    let docDefinition = {
      content: [
        {
          text: 'Hotel Receipt',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#50A581'
        },
        {
          text: 'Hotel Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              { text: 'Hotel Stay Invoice', bold: true, fontSize: 20 },
              { text: `Invoice No: ${this.paymentDetails?.refNumber}` },
              {
                text: `Guest Name: ${this.paymentDetails?.firstName} ${this.paymentDetails?.lastName}`
              },
              { text: `Email: ${this.paymentDetails?.email}` },
              { text: `Mobile: ${this.paymentDetails?.mobile}` },
              { text: `Check-In: ${this.paymentDetails?.checkIn}` },
              { text: `Check-Out: ${this.paymentDetails?.checkOut}` }
            ],
          ]
        },
        // {
        //   columns: [
        //     [
        //       { text: 'Room Details', bold: true, fontSize: 20 },
        //       { text: `Room Name: ${this.paymentDetails?.room_name}` },
        //       { text: `No. of Guests: ${this.paymentDetails?.numOfGuests}` }
        //     ]
        //   ]
        // },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          text: 'Order Details',
          fontSize: 20,
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Description', 'Quantity', 'Price', 'Amount'],
              [ this.paymentDetails?.room_name, `${this.paymentDetails?.adults} adult x ${this.paymentDetails?.children} child`, `R${this.paymentDetails?.room_price}`, `R${(this.paymentDetails?.total) - (this.paymentDetails?.total * 0.15 )}` ],
              [{text: 'Vat 15%', colSpan: 3}, {}, {}, `R${(this.paymentDetails?.total * 0.15)}` ],
              [{text: 'Total Amount', colSpan: 3}, {}, {}, `R${this.paymentDetails?.total}` ]
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              // { text: `${this.orders.ticketType} Order`, bold: true },
              // { text: `Order # ${this.orders.orderRef}` },
              // { text: `${this.orders.createdAt.toDate()}` },
              // { text: `Order By: ${this.orders.firstName} ${this.orders.lastName}`, italics: true, fontSize: 10 }
            ],
            [
              // { qr: this.dataString, fit: '80', alignment: 'right'},
              // { text: this.orders.orderRef, alignment: 'right', fontSize: 10, }
            ],
          ]
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };
    pdfMake.createPdf(docDefinition).open();

  }

  // Download pdf
  downloadPdf(){

    let docDefinition = {
      content: [
        {
          text: 'Hotel Receipt',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          color: '#50A581'
        },
        {
          text: 'Hotel Details',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              { text: 'Hotel Stay Invoice', bold: true, fontSize: 20 },
              { text: `Invoice No: ${this.paymentDetails?.refNumber}` },
              {
                text: `Guest Name: ${this.paymentDetails?.firstName} ${this.paymentDetails?.lastName}`
              },
              { text: `Email: ${this.paymentDetails?.email}` },
              { text: `Mobile: ${this.paymentDetails?.mobile}` },
              { text: `Check-In: ${this.paymentDetails?.checkIn}` },
              { text: `Check-Out: ${this.paymentDetails?.checkOut}` }
            ],
          ]
        },
        // {
        //   columns: [
        //     [
        //       { text: 'Room Details', bold: true, fontSize: 20 },
        //       { text: `Room Name: ${this.paymentDetails?.room_name}` },
        //       { text: `No. of Guests: ${this.paymentDetails?.numOfGuests}` }
        //     ]
        //   ]
        // },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          text: 'Order Details',
          fontSize: 20,
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Description', 'Quantity', 'Price', 'Amount'],
              [ this.paymentDetails?.room_name, `${this.paymentDetails?.adults} adult x ${this.paymentDetails?.children} child`, `R${this.paymentDetails?.room_price}`, `R${(this.paymentDetails?.total) - (this.paymentDetails?.total * 0.15 )}` ],
              [{text: 'Vat 15%', colSpan: 3}, {}, {}, `R${(this.paymentDetails?.total * 0.15)}` ],
              [{text: 'Total Amount', colSpan: 3}, {}, {}, `R${this.paymentDetails?.total}` ]
            ]
          }
        },
        {
          text: '',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              // { text: `${this.orders.ticketType} Order`, bold: true },
              // { text: `Order # ${this.orders.orderRef}` },
              // { text: `${this.orders.createdAt.toDate()}` },
              // { text: `Order By: ${this.orders.firstName} ${this.orders.lastName}`, italics: true, fontSize: 10 }
            ],
            [
              // { qr: this.dataString, fit: '80', alignment: 'right'},
              // { text: this.orders.orderRef, alignment: 'right', fontSize: 10, }
            ],
          ]
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };
    pdfMake.createPdf(docDefinition).download();

  }

}
