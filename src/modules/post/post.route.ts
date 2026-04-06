import { Router } from 'express';
import { PostControllers } from './post.controller.js';
import auth from '../../app/middlewares/auth.middleware.js';
import { upload } from '../../app/utils/multer.js';

const router = Router();

router.post(
  '/',
  auth('user', 'admin'),
  upload.single('media'),
  PostControllers.createPost,
);

router.get(
  '/',
  auth('user', 'admin'),
  PostControllers.getAllPosts,
);

router.get(
  '/my-posts',
  auth('user', 'admin'),
  PostControllers.getMyPosts,
);

router.patch(
  '/:postId/like',
  auth('user', 'admin'),
  PostControllers.toggleLikePost,
);

export const PostRoutes = router;
