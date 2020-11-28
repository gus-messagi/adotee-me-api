import express from 'express';
import AnnouncementController from './Controllers/AnnouncementController';
import UserController from './Controllers/UserController';

const router = express.Router();

// user routes
router.post('/user/register', UserController.create);
router.get('/user/login', UserController.login);

// announcement routes
router.post('/announcement/create', AnnouncementController.create);
router.get('/announcement', AnnouncementController.index);

export default router;
