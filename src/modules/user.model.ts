import { Schema, model, connect } from 'mongoose';
import { User, UserAddress, UserFullname } from './user/user.interface';
import { Order } from './order/order.interface';

const userFullnameSchema = new Schema<UserFullname>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<UserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const UserOrderSchema = new Schema<Order>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: userFullnameSchema,
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: { type: Array, required: true },
  address: UserAddressSchema,
  orders: UserOrderSchema,
});

const User = model<User>('User', userSchema);