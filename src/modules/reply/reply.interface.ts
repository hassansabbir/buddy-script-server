import { Types } from 'mongoose';

export type TReply = {
  commentId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  isDeleted: boolean;
};
