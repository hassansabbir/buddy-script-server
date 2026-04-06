import { TPost } from './post.interface.js';
import { Post } from './post.model.js';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return await result.populate('author', 'firstName lastName profileImage nickname');
};

const getAllPostsFromDB = async (userId: string) => {
  const result = await Post.find({
    $or: [
      { visibility: 'public', isDeleted: false },
      { author: userId, isDeleted: false },
    ],
  })
    .sort({ createdAt: -1 })
    .populate('author', 'firstName lastName profileImage nickname');
  return result;
};

const getMyPostsFromDB = async (userId: string) => {
  const result = await Post.find({ author: userId, isDeleted: false })
    .populate('author', 'firstName lastName profileImage')
    .sort({ createdAt: -1 });
  return result;
};

const toggleLikePost = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error('Post not found');
  }

  const isLiked = post.likes.some((id) => id.toString() === userId);

  if (isLiked) {
    // unlike
    return await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate('author', 'firstName lastName profileImage nickname');
  } else {
    // like
    return await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate('author', 'firstName lastName profileImage nickname');
  }
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getMyPostsFromDB,
  toggleLikePost,
};
