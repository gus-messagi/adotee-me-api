import mongoose from 'mongoose';
import IAnnouncement from '../@types/Announcement';

const { Schema } = mongoose;

const announcementSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  petIds: { type: [Schema.Types.ObjectId], ref: 'Pet', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true }
});

export default mongoose.model<IAnnouncement>('Announcement', announcementSchema);
