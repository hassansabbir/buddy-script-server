import { TPost } from './post.interface.js';
import { Post } from './post.model.js';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getPublicPostsFromDB = async () => {
  const result = await Post.find({ visibility: 'public', isDeleted: false })
    .populate('author', 'firstName lastName profileImage')
    .sort({ createdAt: -1 });
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

  const isLiked = post.likes.includes(userId as any);

  if (isLiked) {
    // unlike
    const result = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: userId } },
      { new: true },
    );
    return result;
  } else {
    // like
    const result = await Post.findByIdAndUpdate(
      postId,
      { $addToSet: { likes: userId } },
      { new: true },
    );
    return result;
  }
};

export const PostServices = {
  createPostIntoDB,
  getPublicPostsFromDB,
  getMyPostsFromDB,
  toggleLikePost,
};
