import { model, Schema } from "mongoose";
const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    product: {
      type: Array,
    },
  },
  {
    collection: "user-data",
  }
);
const CartModel = model("cart", CartSchema);
export default CartModel;
