import { Router } from 'express';
import { UserRoutes } from '../../modules/user/user.route.js';
import { AuthRoutes } from '../../modules/auth/auth.route.js';
import { PostRoutes } from '../../modules/post/post.route.js';
import { CommentRoutes } from '../../modules/comment/comment.route.js';
import { ReplyRoutes } from '../../modules/reply/reply.route.js';
import { StoryRoutes } from '../../modules/story/story.route.js';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/posts',
    route: PostRoutes,
  },
  {
    path: '/comments',
    route: CommentRoutes,
  },
  {
    path: '/replies',
    route: ReplyRoutes,
  },
  {
    path: '/stories',
    route: StoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
