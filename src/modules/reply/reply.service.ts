import { TReply } from './reply.interface.js';
import { Reply } from './reply.model.js';
import { Comment } from '../comment/comment.model.js';
import { Post } from '../post/post.model.js';

const createReplyIntoDB = async (payload: TReply) => {
  const result = await Reply.create(payload);
  const comment = await Comment.findById(payload.commentId);
  if (comment) {
    await Post.findByIdAndUpdate(comment.postId, { $inc: { commentCount: 1 } });
  }
  return await result.populate('userId', 'firstName lastName profileImage');
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
