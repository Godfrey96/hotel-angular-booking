import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { AdminLayoutModule } from './admin/layout/adminlayout.module';

// Datepicker module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ContactComponent } from './components/contact/contact.component';
import { QuotationComponent } from './components/quotation/quotation.component';
import { BookingComponent } from './components/booking/booking.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { LoginComponent } from './admin/components/login/login.component';
import { RegisterComponent } from './admin/components/register/register.component';
import { AddRoomComponent } from './admin/components/add-room/add-room.component';
import { ListOfRoomsComponent } from './admin/components/list-of-rooms/list-of-rooms.component';
import { DashComponent } from './admin/components/dash/dash.component';
import { AmenitiesComponent } from './admin/components/amenities/amenities.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { ListOfBookingsComponent } from './admin/components/list-of-bookings/list-of-bookings.component';
import { UpdateComponent } from './admin/components/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    RoomsComponent,
    ContactComponent,
    QuotationComponent,
    BookingComponent,
    RoomDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AddRoomComponent,
    ListOfRoomsComponent,
    DashComponent,
    AmenitiesComponent,
    PageNotFoundComponent,
    PaymentComponent,
    BookingDetailsComponent,
    ListOfBookingsComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AdminLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
