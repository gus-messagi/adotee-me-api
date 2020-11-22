import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: String,
  email: String,
  password: String,
  photo?: String;
  contact: String;
};
