import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { ReplyServices } from './reply.service.js';

const createReply = catchAsync(async (req: Request, res: Response) => {
  const { commentId, content } = req.body;
  const userId = req.user._id;

  const result = await ReplyServices.createReplyIntoDB({
    commentId,
    userId,
    content,
    likes: [],
    isDeleted: false,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reply added successfully',
    data: result,
  });
});

const getRepliesByComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const result = await ReplyServices.getRepliesByCommentIdFromDB(commentId as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Replies retrieved successfully',
    data: result,
  });
});

const toggleLike = catchAsync(async (req: Request, res: Response) => {
  const { replyId } = req.params;
  const userId = req.user._id;
  const result = await ReplyServices.toggleLikeReply(
    replyId as string,
    userId.toString(),
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reply like toggled successfully',
    data: result,
  });
});

export const ReplyController = {
  createReply,
  getRepliesByComment,
  toggleLike,
};
