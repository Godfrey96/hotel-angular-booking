import { environment } from './../../environments/environment';

export const baseUrl=environment.production?'http://':'http://localhost:3000'


export const roomURL=baseUrl+'/rooms'
export const bookingURL=baseUrl+'/booking'
export const paymentURL=baseUrl+'/payment'
export const contactURL=baseUrl+'/contact'
// export const contactURL=baseUrl+'/contact'
