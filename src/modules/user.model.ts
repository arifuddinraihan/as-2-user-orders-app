import { Schema, model } from 'mongoose';
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrder,
  UserFunctions,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

export const userFullNameSchema = new Schema<TUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    min: 3,
    max: 20,
    trim: true,
    minlength: [3, 'Min allowed length is 3 characters'],
    maxlength: [20, 'Max allowed length is 20 characters'],
  },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

export const userAddressSchema = new Schema<TUserAddress>({
  street: {
    type: String,
    required: [true, 'Street Address is required'],
    min: 3,
  },
  city: { type: String, required: [true, 'City is required'], min: 3 },
  country: { type: String, required: [true, 'Country is required'], min: 1 },
});

export const orderSchema = new Schema<TUserOrder>({
  productName: { type: String, required: [true, 'Product Name is required'] },
  price: { type: Number, required: [true, 'Price is required'] },
  quantity: { type: Number, required: [true, 'Quantity is required'] },
});

const userSchema = new Schema<TUser, UserFunctions>(
  {
    userId: {
      type: Number,
      required: [true, 'userId is required'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Min allowed length is 3 characters'],
      maxlength: [20, 'Max allowed length is 20 characters'],
    },
    password: { type: String, required: [true, 'password is required'] },
    fullName: {
      type: userFullNameSchema,
      required: [true, 'Full Name is required'],
    },
    age: { type: Number, required: [true, 'Age is required'] },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    isActive: { type: Boolean, required: true },
    hobbies: {
      type: [String],
      required: [true, 'Must have at least one Hobby'],
    },
    address: {
      type: userAddressSchema,
      required: [true, 'Address is required'],
    },
    orders: {
      type: [orderSchema],
      required: false,
    },
  },
  { versionKey: false },
);

// If user exists in the data
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId });
  return existingUser;
};

// Password hashing on Pre Hooks
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  // Calling next function
  next();
});

// Password showing empty on Post Hooks
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser, UserFunctions>('User', userSchema);
