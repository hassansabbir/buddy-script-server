import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { StoryServices } from './story.service.js';
import { sendImageToCloudinary } from '../../app/utils/cloudinary.js';
import { User } from '../user/user.model.js';

const createStory = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  let media = '';
  if (req.file) {
    const imageName = `story-${user.firstName}-${Date.now()}`;
    const path = req.file.path;
    const cloudinaryResponse = await sendImageToCloudinary(imageName, path);
    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      throw new Error('Failed to upload image to Cloudinary.');
    }
    media = cloudinaryResponse.secure_url;
  } else {
    throw new Error('Please upload a media file for the story.');
  }

  const result = await StoryServices.createStoryIntoDB({
    author: user._id,
    media,
  });

  if (!result) {
    throw new Error('Failed to save story to database.');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Story created successfully',
    data: result,
  });
});

const getStories = catchAsync(async (req, res) => {
  const result = await StoryServices.getStoriesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stories retrieved successfully',
    data: result,
  });
});

export const StoryControllers = {
  createStory,
  getStories,
};
