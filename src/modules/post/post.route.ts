import { Router } from 'express';
import { PostController } from './post.controller.js';
import auth from '../../app/middlewares/auth.middleware.js';
import { upload } from '../../app/utils/multer.js';

const router = Router();

router.post(
  '/',
  auth('user', 'admin'),
  upload.single('media'),
  PostController.createPost,
);

router.get('/', PostController.getPublicPosts);

router.get('/me', auth('user', 'admin'), PostController.getMyPosts);

router.patch('/:postId/like', auth('user', 'admin'), PostController.toggleLike);

export const PostRoutes = router;
