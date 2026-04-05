import { Router } from 'express';
import { CommentController } from './comment.controller.js';
import auth from '../../app/middlewares/auth.middleware.js';

const router = Router();

router.post('/', auth('user', 'admin'), CommentController.createComment);

router.get('/:postId', CommentController.getCommentsByPost);

router.patch(
  '/:commentId/like',
  auth('user', 'admin'),
  CommentController.toggleLike,
);

export const CommentRoutes = router;
