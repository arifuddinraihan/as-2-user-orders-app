import { Order } from '../order/order.interface';

export type UserFullName = {
  firstName: string;
  lastName: string;
};

export type HobbiesArray = {
  [index: number]: string;
};

export type UserAddress = {
  street: string;
  city: string;
  country: string;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: UserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: HobbiesArray;
  address: UserAddress;
};
