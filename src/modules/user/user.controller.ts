import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createAnUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // Calling Service Function to send this data
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

export const UserControllers = {
  createAnUser,
  getAllUsers,
  getSingleUser,
};
