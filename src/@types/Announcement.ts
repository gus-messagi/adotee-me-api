import { Document } from 'mongoose';

export default interface IAnnouncement extends Document {
  userId: string;
  petIds: string[];
  title: string;
  description: string;
  state: string;
  city: string;
  photos: string[],
  jointAdoption: boolean;
}
