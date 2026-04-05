import { Schema, model } from 'mongoose';
import { TPost } from './post.interface.js';

const postSchema = new Schema<TPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    media: { type: String, default: '' },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Index for feed performance
postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1 });

export const Post = model<TPost>('Post', postSchema);
