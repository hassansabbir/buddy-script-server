import { Router } from 'express';
import { StoryControllers } from './story.controller.js';
import auth from '../../app/middlewares/auth.middleware.js';
import { upload } from '../../app/utils/multer.js';

const router = Router();

router.post(
  '/',
  auth('user', 'admin'),
  upload.single('media'),
  StoryControllers.createStory,
);

router.get('/', StoryControllers.getStories);

export const StoryRoutes = router;
