import { Document } from 'mongoose';

export default interface IPet extends Document {
  userId: string;
  name?: string;
  breed?: string;
  sex: string;
  age: string;
  type: string;
  size?: string;
  health?: string[];
  temperament?: string[];
  hasSpecialNeeds: boolean;
  specialNeeds?: string;
  adopted: boolean;
};
