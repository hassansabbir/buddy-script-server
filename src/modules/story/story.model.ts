import { Schema, model } from 'mongoose';
import { TStory } from './story.interface.js';

const storySchema = new Schema<TStory>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    media: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Index for query performance
storySchema.index({ createdAt: -1 });

export const Story = model<TStory>('Story', storySchema);
