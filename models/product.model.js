import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    csvId: {
      type: String,
      required: true,
    },
    slNo: {
      type: Number,
      required: true,
    },
    productName: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    inputImgUrls: {
      type: [String],
      required: true,
    },
    outputImgUrls: {
      type: [String],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
