import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { CommentServices } from './comment.service.js';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const { postId, content } = req.body;
  const userId = req.user._id;

  const result = await CommentServices.createCommentIntoDB({
    postId,
    userId,
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

const getCommentsByPost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const result = await CommentServices.getCommentsByPostIdFromDB(postId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments retrieved successfully',
    data: result,
  });
});

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  const result = await CommentServices.toggleLikeComment(
    commentId as string,
    userId.toString(),
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
