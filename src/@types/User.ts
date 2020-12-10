import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  photo?: string;
  contact: string;
  favorites?: string[];
};
