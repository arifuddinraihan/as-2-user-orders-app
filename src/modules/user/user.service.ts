import { UserModel } from '../user.model';
import { TUser } from './user.interface';

const insertUserInDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1 } },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId });
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

export const UserServices = {
  insertUserInDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
};
