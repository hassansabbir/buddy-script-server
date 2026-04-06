import { Types } from 'mongoose';

export type TPost = {
  author: Types.ObjectId;
  content: string;
  media?: string;
  visibility: 'public' | 'private';
  likes: Types.ObjectId[];
  commentCount: number;
  isDeleted: boolean;
};
