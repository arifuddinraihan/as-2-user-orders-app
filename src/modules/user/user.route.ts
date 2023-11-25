import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

// Controller Functions
router.post('/api/users', UserControllers.createAnUser);
router.get('/api/users', UserControllers.getAllUsers);
router.get('/api/users/:userId', UserControllers.getSingleUser);
router.put('/api/users/:userId', UserControllers.updateSingleUser);
router.delete('/api/users/:userId', UserControllers.deleteSingleUser);
router.put('/api/users/:userId/orders', UserControllers.updateSingleUserOrders);
router.get('/api/users/:userId/orders', UserControllers.getOrdersOfSingleUser);
router.get('/api/users/:userId/orders/total-price', UserControllers.getOrdersTotalPriceOfSingleUser);

export const userRoutes = router;
