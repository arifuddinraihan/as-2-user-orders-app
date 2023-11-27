import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { validateOrder, validateUser } from './user.validation';
import { UserModel } from '../user.model';

const createAnUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    // Validation using Zod
    const zodParsedData = validateUser.parse(userData);

    // Calling Service Function to send this data to DB
    const result = await UserServices.insertUserInDB(zodParsedData);

    // Sending Response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    // Calling Service Function to find all users data
    const result = await UserServices.getAllUserFromDB();

    // If no user exists showing no user found
    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    }

    // Sending Response
    res.status(200).json({
      success: true,
      message: 'No user found.',
      data: null,
    });
  } catch (error) {
    console.error(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const numberUserId = parseFloat(userId);

    // Calling User Exists Function from UserModel
    const userExists = await UserModel.isUserExists(numberUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: { code: 404, description: 'User not found!' },
      });
    }

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

    // Calling User Exists Function from UserModel
    const userExists = await UserModel.isUserExists(numberUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: { code: 404, description: 'User not found!' },
      });
    }

    // Update data body
    const updatedProperties = req.body;
    const zodParsedUpdatedData = validateUser.parse(updatedProperties);

    // Calling Service Function to update single user data
    const result = await UserServices.updateSingleUserFromDB(
      numberUserId,
      zodParsedUpdatedData,
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

    // Calling User Exists Function from UserModel
    const userExists = await UserModel.isUserExists(numberUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: { code: 404, description: 'User not found!' },
      });
    }

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

    // Calling User Exists Function from UserModel
    const userExists = await UserModel.isUserExists(numberUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: { code: 404, description: 'User not found!' },
      });
    }

    const updatedProperties = req.body;
    // Zod Parser for orders type
    const validOrder = validateOrder.parse(updatedProperties);

    // Calling Service Function to add orders to single user data
    await UserServices.updateSingleUseOrdersFromDB(numberUserId, validOrder);

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

    // Calling User Exists Function from UserModel
    const userExists = await UserModel.isUserExists(numberUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: { code: 404, description: 'User not found!' },
      });
    }

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

    // Calling User Exists Function from UserModel
    const userExists = await UserModel.isUserExists(numberUserId);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: 'User not found!',
        error: { code: 404, description: 'User not found!' },
      });
    }

    // Calling Service Function to find single user's total Price of orders from data
    const result =
      await UserServices.getOrdersTotalPriceOfSingleUserFromDB(numberUserId);

    // Sending Response
    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result.length > 0 ? result[0].totalPrice : 0,
      },
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
