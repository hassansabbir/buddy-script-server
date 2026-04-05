import { Schema, model } from 'mongoose';
import { TReply } from './reply.interface.js';

const replySchema = new Schema<TReply>(
  {
    commentId: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

replySchema.index({ commentId: 1 });

export const Reply = model<TReply>('Reply', replySchema);
