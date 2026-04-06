import { TStory } from './story.interface.js';
import { Story } from './story.model.js';

const createStoryIntoDB = async (payload: TStory) => {
  const result = await Story.create(payload);
  return result;
};

const getStoriesFromDB = async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const result = await Story.find({
    createdAt: { $gte: twentyFourHoursAgo },
  })
    .populate('author', 'firstName lastName profileImage')
    .sort({ createdAt: -1 });

  return result;
};

export const StoryServices = {
  createStoryIntoDB,
  getStoriesFromDB,
};
