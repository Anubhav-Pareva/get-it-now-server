import { model, Schema } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      unique:true,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        price:{
          type:Number
        },
        productTotalPrice:{
          type:Number
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice:{
      type:Number,
    }
  },
  {
    collection: "cart-data",
  }
);

const CartModel = model("cart", CartSchema);
export default CartModel;
