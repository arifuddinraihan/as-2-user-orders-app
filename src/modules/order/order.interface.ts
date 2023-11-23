import { Schema, model, connect } from 'mongoose';

export type Order = {
  productName: string;
  price: number;
  quantity: number;
};
