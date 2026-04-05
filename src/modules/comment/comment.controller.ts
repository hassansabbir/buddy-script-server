import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { CommentServices } from './comment.service.js';
import { User } from '../user/user.model.js';

const createComment = catchAsync(async (req, res) => {
  const { postId, content } = req.body;
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  const result = await CommentServices.createCommentIntoDB({
    postId,
    userId: user._id.toString() as any,
    content,
    likes: [],
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment added successfully',
    data: result,
  });
});

const getCommentsByPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await CommentServices.getCommentsByPostIdFromDB(postId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully',
    data: result,
  });
});

const toggleLike = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    throw new Error('User not found');
  }
  const result = await CommentServices.toggleLikeComment(
    commentId as string,
    user._id.toString(),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment like toggled successfully',
    data: result,
  });
});

export const CommentController = {
  createComment,
  getCommentsByPost,
  toggleLike,
};
