import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { PostServices } from './post.service.js';
import { sendImageToCloudinary } from '../../app/utils/cloudinary.js';

const createPost = catchAsync(async (req: Request, res: Response) => {
  let media = '';
  
  if (req.file) {
    const imageName = `post-${req.user._id}-${Date.now()}`;
    const path = req.file.path;
    const cloudinaryResponse = await sendImageToCloudinary(imageName, path);
    if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
      throw new Error('Failed to upload image to Cloudinary.');
    }
    media = cloudinaryResponse.secure_url;
  }

  const result = await PostServices.createPostIntoDB({
    ...req.body,
    media,
    author: req.user._id as string,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post is created successfully',
    data: result,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.getAllPostsFromDB(req.user._id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts are retrieved successfully',
    data: result,
  });
});

const getMyPosts = catchAsync(async (req: Request, res: Response) => {
  const result = await PostServices.getMyPostsFromDB(req.user._id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My posts are retrieved successfully',
    data: result,
  });
});

const toggleLikePost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const userId = req.user._id as string;
  const result = await PostServices.toggleLikePost(postId as string, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post liked/unliked successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
  getAllPosts,
  getMyPosts,
  toggleLikePost,
};
