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
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

const updateSingleUserFromDB = async (
  userId: number,
  updatedProperties: Partial<TUser>,
) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: updatedProperties },
  );
  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  await UserModel.deleteOne({ userId: userId });
};

const updateSingleUseOrdersFromDB = async (
  userId: number,
  addedOrders: TUserOrder,
) => {
  await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: addedOrders } },
  );
};

const getOrdersOfSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId: { $eq: userId } } },
    { $project: { userId: 1, orders: 1 } },
  ]);
  return result;
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
  updateSingleUseOrdersFromDB,
  getOrdersOfSingleUserFromDB,
  getOrdersTotalPriceOfSingleUserFromDB,
};
