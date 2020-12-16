import mongoose from 'mongoose';
import IAnnouncement from '../@types/Announcement';

const { Schema } = mongoose;

const announcementSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  petIds: { type: [Schema.Types.ObjectId], ref: 'Pet', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  jointAdoption: { type: Boolean, required: true, default: false },
  isOpen: { type: Boolean, required: true, default: true },
  photos: { type: [String], default: [] }
});

export default mongoose.model<IAnnouncement>('Announcement', announcementSchema);
