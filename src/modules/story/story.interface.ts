import { Types } from 'mongoose';

export interface TStory {
  author: Types.ObjectId;
  media: string;
  createdAt?: Date;
  updatedAt?: Date;
}
