import { Schema, model } from 'mongoose';
import { TComment } from './comment.interface.js';

const commentSchema = new Schema<TComment>(
  {
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

commentSchema.index({ postId: 1 });

export const Comment = model<TComment>('Comment', commentSchema);
