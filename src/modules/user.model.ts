import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

const userFullNameSchema = new Schema<TUserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

// const userOrdersSchema = new Schema<TUserOrders>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });

const userSchema = new Schema<TUser>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: userFullNameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: Array, required: true },
    address: userAddressSchema,
    orders: { type: Array },
  },
  { versionKey: false },
);

// Password hashing on Pre Hooks
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// Password hashing on Pre Hooks
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);
