import { Order } from '../order/order.interface';

export type UserFullname = {
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
  fullName: UserFullname;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: HobbiesArray;
  address: UserAddress;
  orders?: Order; // I will show a validation if there is no order, when order will be added, will shown here
};
