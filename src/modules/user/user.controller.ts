import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createAnUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // Calling Service Function to send this data to DB
    const result = await UserServices.insertUserInDB(userData);
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Calling Service Function to find all users data
    const result = await UserServices.getAllUserFromDB();
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numberUserId = parseFloat(userId);
    // Calling Service Function to find single user data
    const result = await UserServices.getSingleUserFromDB(numberUserId);
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const numberUserId = parseFloat(userId);
    const updatedProperties = req.body;
    // Calling Service Function to update single user data
    const result = await UserServices.updateSingleUserFromDB(
      numberUserId,
      updatedProperties,
    );
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numberUserId = parseFloat(userId);
    // Calling Service Function to delete single user data
    await UserServices.deleteSingleUserFromDB(numberUserId);
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateSingleUserOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const numberUserId = parseFloat(userId);
    const updatedProperties = req.body;
    // Calling Service Function to add orders to single user data
    await UserServices.updateSingleUseOrdersFromDB(
      numberUserId,
      updatedProperties,
    );
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const getOrdersOfSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numberUserId = parseFloat(userId);
    // Calling Service Function to find single user orders data
    const result = await UserServices.getOrdersOfSingleUserFromDB(numberUserId);
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

const getOrdersTotalPriceOfSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numberUserId = parseFloat(userId);
    // Calling Service Function to find single user's total Price of orders from data
    const result =
      await UserServices.getOrdersTotalPriceOfSingleUserFromDB(numberUserId);
    // Sending Response
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    });
  } catch (error) {
    console.error(error);
  }
};

export const UserControllers = {
  createAnUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  updateSingleUserOrders,
  getOrdersOfSingleUser,
  getOrdersTotalPriceOfSingleUser,
};
