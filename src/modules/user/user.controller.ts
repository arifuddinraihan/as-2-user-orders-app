import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { validateOrder, validateUser } from './user.validation';
import { UserModel } from '../user.model';

// Create User Controller using inserUserInDb function from service
const createAnUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Validation using Zod
    const zodParsedData = validateUser.parse(user);

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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Getting all User Controller using getAllUserFromDB function from service
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Getting a single User Controller using getSingleUserFromDB function from service
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Updating a single User Controller using updateSingleUserFromDB function from service
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
    // If Result become null then will receive not completed response
    if (result === null) {
      // Sending Response
      res.status(404).json({
        success: false,
        message: 'User update not completed!',
        data: result,
      });
    } else {
      // If Result is okay then user will receive successfull response
      const {
        userId,
        username,
        fullName,
        age,
        email,
        isActive,
        hobbies,
        address,
      } = result;
      // Sending Response
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: {
          userId,
          username,
          fullName,
          age,
          email,
          isActive,
          hobbies,
          address,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Deleting a single User Controller using deleteSingleUserFromDB function from service
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Updating a single User with Orders Controller using updateSingleUserOrdersFromDB function from service
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Getting a single User Orders Data Controller using getOrdersOfSingleUserFromDB function from service
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
};

// Getting a single User Total Price from all Orders Controller using getOrdersTotalPriceOfSingleUserFromDB function from service
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
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
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
