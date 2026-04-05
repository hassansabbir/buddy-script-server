import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { PostServices } from './post.service.js';
import { sendImageToCloudinary } from '../../app/utils/cloudinary.js';
import { User } from '../user/user.model.js';

const createPost = catchAsync(async (req, res) => {
  const { content, visibility } = req.body;
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  let media = '';
  if (req.file) {
    const imageName = `${user.firstName}-${Date.now()}`;
    const path = req.file.path;
    const cloudinaryResponse = await sendImageToCloudinary(imageName, path);
    media = cloudinaryResponse.secure_url;
  }

  const result = await PostServices.createPostIntoDB({
    author: user._id,
    content,
    visibility,
    media,
    likes: [],
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  });
});

const getPublicPosts = catchAsync(async (req, res) => {
  const result = await PostServices.getPublicPostsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Public posts retrieved successfully',
    data: result,
  });
});

const getMyPosts = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    throw new Error('User not found');
  }
  const result = await PostServices.getMyPostsFromDB(user._id.toString());
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My posts retrieved successfully',
    data: result,
  });
});

const toggleLike = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    throw new Error('User not found');
  }
  const result = await PostServices.toggleLikePost(
    postId as string,
    user._id.toString(),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post like toggled successfully',
    data: result,
  });
});

export const PostController = {
  createPost,
  getPublicPosts,
  getMyPosts,
  toggleLike,
};
