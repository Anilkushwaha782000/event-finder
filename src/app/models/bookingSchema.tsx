import mongoose, { Schema, Document,Types } from 'mongoose';
interface IEventBooking extends Document {
  eventName: string;
  userName: string;
  email: string;
  ticket: number;
  date: string;
  eventId:string;
  imageUrl:string;
  user: Types.ObjectId;
}

const EventBookingSchema: Schema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  ticket: {
    type: Number,
    required: true,
    min: 1,
  },
  date: {
    type: String,
    required: true,
  },
  eventId:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  user: {
    type: String,
    ref: 'User',
    required: true,
  }
  
} );

const EventBooking = mongoose.models.EventBooking || mongoose.model<IEventBooking>('EventBooking', EventBookingSchema);

export default EventBooking;
