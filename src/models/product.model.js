import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    productSingleImage: {
      type: String,
      default: "",
    },
    productImages: [
      {
        type: String,
        default: "",
      },
    ],
    addedById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", 
      required: true,
    },
    productCategory: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const product = mongoose.model("product", productSchema);
