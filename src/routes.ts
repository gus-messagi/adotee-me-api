import express from 'express';
import UserController from './Controllers/UserController';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.post('/user/register', UserController.create);
router.get('/user/login', UserController.login);

export default router;
