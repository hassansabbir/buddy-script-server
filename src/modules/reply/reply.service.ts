import { TReply } from './reply.interface.js';
import { Reply } from './reply.model.js';

const createReplyIntoDB = async (payload: TReply) => {
  const result = await Reply.create(payload);
  return result;
};

const getRepliesByCommentIdFromDB = async (commentId: string) => {
  const result = await Reply.find({ commentId, isDeleted: false })
    .populate('userId', 'firstName lastName profileImage')
    .sort({ createdAt: 1 });
  return result;
};

const toggleLikeReply = async (replyId: string, userId: string) => {
  const reply = await Reply.findById(replyId);
  if (!reply) {
    throw new Error('Reply not found');
  }

  const isLiked = reply.likes.includes(userId as any);

  if (isLiked) {
    const result = await Reply.findByIdAndUpdate(
      replyId,
      { $pull: { likes: userId } },
      { new: true },
    );
    return result;
  } else {
    const result = await Reply.findByIdAndUpdate(
      replyId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    return result;
  }
};

export const ReplyServices = {
  createReplyIntoDB,
  getRepliesByCommentIdFromDB,
  toggleLikeReply,
};
