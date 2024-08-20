import { product } from "../models/product.model.js";
import { user } from "../models/users.model.js";
import cloudinary from "../services/cloudinary.js";
// import fs from "fs";

// const productUploadToCloudinary = async (filePath) => {
//   try {
//     console.log(filePath, "controller File Path");
//     const uploadResult = await cloudinary.uploader.upload(filePath, {
//       folder: "products",
//       resource_type: "auto",
//     });
//     return uploadResult.secure_url;
//   } catch (error) {
//     console.log(error);
//     return error;
//   } 
// };
const productUploadToCloudinary = async (fileBuffer) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader
        .upload_stream(
          { folder: "products", resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        )
        .end(fileBuffer);
    });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const productAddController = async (req, resp) => {
  const user_id = req.params.id;
  const { name, price, description, productCategory } = req.body;
      const user_found = await user.findById(user_id);
      if (!user_found)
        return res.status(404).json({ message: "User not found" });

      let productSingleImageUrl = "";
      if (
        req.files.productSingleImage &&
        req.files.productSingleImage.length > 0
      ) {
        const singleImageBuffer = req.files.productSingleImage[0].buffer;
        productSingleImageUrl = await productUploadToCloudinary(
          singleImageBuffer
        );
      }

      const productImagesUrls = [];
      if (req.files.productImages && req.files.productImages.length > 0) {
        const uploadPromises = req.files.productImages.map((file) =>
          productUploadToCloudinary(file.buffer)
        );
        productImagesUrls.push(...(await Promise.all(uploadPromises)));
      }
  const newProduct = new product({
    name,
    price,
    description,
    productSingleImage: productSingleImageUrl,
    productImages: productImagesUrls,
    productCategory,
    addedById: user_found._id,
  });
  try {
    const savedProduct = await newProduct.save();
    resp.status(201).json(savedProduct);
  } catch (error) {
    resp.status(500).json({ error: "Failed to add product" });
  }
};
const getAllProducts = async (req, resp) => {
  const products = await product.find().populate("addedById", "-password");

  // const products = await user.find({_id:req.params.id}).populate('addedById');
  //  const allProduct = await product.find();
  resp.status(200).json({ data: products, message: "ok" });
};

export { productAddController, getAllProducts };

// import { product } from "../models/product.model.js";

// import { productUploadToCloudinary } from "../utils/clouldinary.js";

// export const productAddController = async (req, resp) => {
//   const { name, price, description, productCategory } = req.body;
//   //   const  secure_url  = await productUploadToCloudinary(req.file);
//   //   console.log(secure_url);
//   //   if (!secure_url) return false;

//   const productImagesUrls = [];
//   if (req.files.productImages) {
//     for (const file of req.files.productImages) {
//       console.log(file.path);
//       const imagePath = file.path;
//       const imageUrl = await productUploadToCloudinary(imagePath);
//       productImagesUrls.push(imageUrl);
//       console.log(productImagesUrls);
//     }
//   }

//   //   const newProduct = new product({
//   //     name,
//   //     price,
//   //     description,
//   //     productSingleImage: secure_url,
//   //     productImages: "productImagesUrls,"
//   //     productCategory,
//   //   });

//   //   try {
//   //     const savedProduct = await newProduct.save();
//   //     resp.status(201).json(savedProduct);
//   //   } catch (error) {
//   //     resp.status(500).json({ error: "Failed to add product" });
//   //   }
// };
