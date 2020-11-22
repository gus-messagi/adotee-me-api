import mongoose from 'mongoose';
import IUser from '../@types/User';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  photo: { type: String },
  contact: { type: String, required: true }
});

export default mongoose.model<IUser>('User', userSchema);
