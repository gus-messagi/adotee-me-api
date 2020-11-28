import mongoose from 'mongoose';
import IPet from '../@types/Pet';
import { SEX, AGE, SIZE, TYPE, HEALTH } from '../Constants/Pet';

const { Schema } = mongoose;

const petSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String },
  breed: { type: String },
  sex: { type: String, enum: [SEX.FEMALE, SEX.MALE, SEX.UNDEFINED], required: true },
  age: { type: String, enum: [AGE.YOUNG, AGE.ADULT, AGE.OLD], required: true },
  size: { type: String, enum: [SIZE.SMALL, SIZE.MEDIUM, SIZE.LARGE] },
  type: { type: String, enum: [TYPE.CAT, TYPE.DOG, TYPE.OTHER, TYPE.RODENT], required: true },
  health: { type: [String], enum: [HEALTH.CASTRATED, HEALTH.DEWORMED, HEALTH.VACCINATED] },
  hasSpecialNeeds: { type: Boolean, required: true },
  specialNeeds: { type: String, maxlength: 255 },
  temperament: { type: [String] },
  adopted: { type: Boolean, required: true, default: false }
});

export default mongoose.model<IPet>('Pet', petSchema);
