export class Payment{
  id?: number;
  cardHolder?: string;
  cardNumber?: number;
  expiryDate?: Date;
  cvvNumber?: number;
  confirmNumber?: any;
  room_name?: string;
  room_price?: any;
  total?: any;
  refNumber?: any;
  adults?: number;
  children?: number;
  email?: string;
  mobile?: number;
  checkIn?: Date;
  checkOut?: Date;
  firstName?: string;
  lastName?: string;
  status?: 'pending';
  numOfGuests?: number;
}
