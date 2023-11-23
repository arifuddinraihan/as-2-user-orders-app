import { UserModel } from '../user.model';
import { User } from './user.interface';

const insertUserInDB = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};
const getSingleUserFromDB = async (userId: Number) => {
  const result = await UserModel.findOne({ userId: userId });
  return result;
};

export const UserServices = {
  insertUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
