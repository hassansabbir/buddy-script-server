import { TComment } from './comment.interface.js';
import { Comment } from './comment.model.js';
import { Post } from '../post/post.model.js';

const createCommentIntoDB = async (payload: TComment) => {
  const result = await Comment.create(payload);
  await Post.findByIdAndUpdate(payload.postId, { $inc: { commentCount: 1 } });
  return await result.populate('userId', 'firstName lastName profileImage');
};

const getCommentsByPostIdFromDB = async (postId: string) => {
  const result = await Comment.find({ postId, isDeleted: false })
    .populate('userId', 'firstName lastName profileImage')
    .sort({ createdAt: -1 });
  return result;
};

const toggleLikeComment = async (commentId: string, userId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }

  const isLiked = comment.likes.includes(userId as any);

  if (isLiked) {
    const result = await Comment.findByIdAndUpdate(
      commentId,
      { $pull: { likes: userId } },
      { new: true },
    );
    return result;
  } else {
    const result = await Comment.findByIdAndUpdate(
      commentId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    return result;
  }
};

export const CommentServices = {
  createCommentIntoDB,
  getCommentsByPostIdFromDB,
  toggleLikeComment,
};
