import express from 'express';
import AnnouncementController from './Controllers/AnnouncementController';
import PetController from './Controllers/PetController';
import UserController from './Controllers/UserController';

const router = express.Router();

// user routes
router.post('/user/register', UserController.create);
router.put('/user/favorites/:id', UserController.favorites);
router.post('/user/login', UserController.login);
router.post('/user/token', UserController.getUser);

// pet routes
router.put('/pet/:id', PetController.updateOneAdoption);

// announcement routes
router.post('/announcement/create', AnnouncementController.create);
router.get('/announcement', AnnouncementController.index);
router.put('/announcement/close/:id', AnnouncementController.closeAnnouncement);

export default router;
