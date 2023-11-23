import { Schema, model } from 'mongoose';
import { User, UserAddress, UserFullName } from './user/user.interface';
import { Order } from './order/order.interface';

const userFullNameSchema = new Schema<UserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<UserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userSchema = new Schema<User>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: userFullNameSchema,
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: Array, required: true },
    address: UserAddressSchema,
  },
  { versionKey: false },
);

export const UserModel = model<User>('User', userSchema);
