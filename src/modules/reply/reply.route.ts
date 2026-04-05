import { Router } from 'express';
import { ReplyController } from './reply.controller.js';
import auth from '../../app/middlewares/auth.middleware.js';

const router = Router();

router.post('/', auth('user', 'admin'), ReplyController.createReply);

router.get('/:commentId', ReplyController.getRepliesByComment);

router.patch(
  '/:replyId/like',
  auth('user', 'admin'),
  ReplyController.toggleLike,
);

export const ReplyRoutes = router;
