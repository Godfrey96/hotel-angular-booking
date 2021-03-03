import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRoomComponent } from './admin/components/add-room/add-room.component';
import { AmenitiesComponent } from './admin/components/amenities/amenities.component';
import { DashComponent } from './admin/components/dash/dash.component';
import { ListOfBookingsComponent } from './admin/components/list-of-bookings/list-of-bookings.component';
import { ListOfRoomsComponent } from './admin/components/list-of-rooms/list-of-rooms.component';
import { LoginComponent } from './admin/components/login/login.component';
import { RegisterComponent } from './admin/components/register/register.component';
import { UpdateComponent } from './admin/components/update/update.component';
import { MainContentComponent } from './admin/layout/main-content/main-content.component';
import { AboutComponent } from './components/about/about.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { BookingComponent } from './components/booking/booking.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RoomDetailsComponent } from './components/room-details/room-details.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'service', component: ServicesComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'complete-booking/:id', component: PaymentComponent },
  { path: 'booking-details/:id', component: BookingDetailsComponent },
  { path: 'room-details/:id', component: RoomDetailsComponent },
  // { path: '**', component: PageNotFoundComponent },
  // ADMIN ROUTING COMPONENTS
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main-content', component: MainContentComponent },
  { path: 'list-of-rooms', component: ListOfRoomsComponent },
  { path: 'add-room', component: AddRoomComponent },
  { path: 'dashboard', component: DashComponent },
  { path: 'amenities', component: AmenitiesComponent },
  { path: 'bookings', component: ListOfBookingsComponent },
  { path: 'update-room/:id', component: UpdateComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
