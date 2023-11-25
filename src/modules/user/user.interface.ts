export type TUserFullName = {
  firstName: string;
  lastName: string;
};

export type THobbiesArray = {
  [index: number]: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUserOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUserOrdersArray = {
  [index: number]: TUserOrders;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: THobbiesArray;
  address: TUserAddress;
  orders?: TUserOrdersArray;
};
