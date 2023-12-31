import { UserModel } from '../user.model';
import { TUser, TUserOrder } from './user.interface';

const insertUserInDB = async (user: TUser) => {
  // console.log(user)
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);

  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne(
    { userId },
    {
      userId: 1,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      isActive: 1,
      hobbies: 1,
      address: 1,
    },
  );
  return result;
};

const updateSingleUserFromDB = async (id: number, updatedProperties: TUser) => {
  const {
    userId,
    username,
    password,
    fullName,
    age,
    email,
    isActive,
    hobbies,
    address,
  } = updatedProperties;
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    {
      userId,
      username,
      password,
      fullName,
      age,
      email,
      isActive,
      hobbies,
      address,
    },
    { new: true },
  );
  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  await UserModel.deleteOne({ userId: userId });
};

const updateSingleUserOrdersFromDB = async (
  userId: number,
  addedOrders: TUserOrder,
) => {
  await UserModel.findOneAndUpdate(
    { userId: userId },
    { $push: { orders: addedOrders } },
  );
};

const getOrdersOfSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId: { $eq: userId } } },
    { $project: { orders: 1 } },
  ]);
  return result[0];
};

const getOrdersTotalPriceOfSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId: { $eq: userId } } },
    { $unwind: '$orders' },
    {
      $addFields: {
        subtotalPrice: { $multiply: ['$orders.price', '$orders.quantity'] },
      },
    },
    { $group: { _id: null, totalPrice: { $sum: '$subtotalPrice' } } },
  ]);
  return result;
};

export const UserServices = {
  insertUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUseOrdersFromDB: updateSingleUserOrdersFromDB,
  getOrdersOfSingleUserFromDB,
  getOrdersTotalPriceOfSingleUserFromDB,
};
