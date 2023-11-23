import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Controller Functions
router.post('/POST/api/users', UserControllers.createAnUser);
router.get('/GET/api/users', UserControllers.getAllUsers);
router.get('/GET/api/users/:userId', UserControllers.getSingleUser);

export const userRoutes = router;