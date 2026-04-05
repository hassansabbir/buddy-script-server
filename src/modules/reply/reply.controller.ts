import httpStatus from 'http-status';
import catchAsync from '../../app/utils/catchAsync.js';
import sendResponse from '../../app/utils/sendResponse.js';
import { ReplyServices } from './reply.service.js';
import { User } from '../user/user.model.js';

const createReply = catchAsync(async (req, res) => {
  const { commentId, content } = req.body;
  const user = await User.findOne({ email: req.user.email });

  if (!user) {
    throw new Error('User not found');
  }

  const result = await ReplyServices.createReplyIntoDB({
    commentId,
    userId: user._id.toString() as any,
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

const getRepliesByComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const result = await ReplyServices.getRepliesByCommentIdFromDB(
    commentId as string,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Replies retrieved successfully',
    data: result,
  });
});

const toggleLike = catchAsync(async (req, res) => {
  const { replyId } = req.params;
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    throw new Error('User not found');
  }
  const result = await ReplyServices.toggleLikeReply(
    replyId as string,
    user._id.toString(),
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
