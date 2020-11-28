import { Document } from 'mongoose';

export default interface IAnnouncement extends Document {
  _id: string;
  userId: string;
  petIds: string[];
  title: string;
  description: string;
  state: string;
  city: string;
  photos: string[],
}
