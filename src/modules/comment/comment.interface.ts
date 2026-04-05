import { Types } from 'mongoose';

export type TComment = {
  postId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  isDeleted: boolean;
};
