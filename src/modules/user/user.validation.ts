import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
});

const userAddressSchema = z.object({
  street: z.string().nonempty('Street is required'),
  city: z.string().nonempty('City is required'),
  country: z.string().nonempty('Country is required'),
});

const userOrdersFieldSchema = z.object({
  productName: z.string().nonempty('Product name is required'),
  price: z.number().nonnegative('Price must be a non-negative number'),
  quantity: z.number().nonnegative('Quantity must be a non-negative number'),
});

const userOrdersSchema = z.array(userOrdersFieldSchema).optional();

const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().nonempty('Username is required'),
  password: z.string().nonempty('Password is required'),
  fullName: userFullNameSchema,
  age: z.number().positive(),
  email: z.string().email('Invalid email format'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).optional(), // Optional hobbies array
  address: userAddressSchema,
  orders: userOrdersSchema.optional(), // Optional orders array
});

export const validateUser = userValidationSchema;