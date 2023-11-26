import { Number, Schema, model } from 'mongoose';
import { TUser, TUserOrder } from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

export const orderSchema = new Schema<TUserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser>(
  {
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: Object, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true },
    hobbies: { type: [String], required: false },
    address: { type: Object, required: true },
    orders: {
      type: Array<TUserOrder>,
      required: false,
    },
  },
  { toJSON: { virtuals: true }, versionKey: false },
);

// Virtuals

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
