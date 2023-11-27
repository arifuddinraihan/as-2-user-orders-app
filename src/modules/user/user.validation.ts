import { z } from 'zod';

const userFullNameSchema = z.object({
  firstName: z.string().min(3).max(20).trim(),
  lastName: z.string(),
});

const userAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userOrderSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string(),
  password: z.string(),
  fullName: userFullNameSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: userAddressSchema,
  orders: z.array(userOrderSchema).optional(),
});

export const validateUser = userValidationSchema;
export const validateOrder = userOrderSchema;
