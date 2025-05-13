import { model, Schema } from "mongoose";

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    collection: "otp-record",
  }
);
const OtpModel = model("otp", OtpSchema);
export default OtpModel;