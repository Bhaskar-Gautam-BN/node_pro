import cloudinary from "../services/cloudinary.js";
const getBase64 = (file) => {
  return `data:${file?.mimetype};base64,${file?.buffer?.toString("base64")}`;
};
const productUploadToCloudinary = async (file) => {
  console.log(file);
  try {
    const uploadResult = await cloudinary?.uploader?.upload(getBase64(file), {
      folder: "products",
      resource_type: "auto",
    });
    return uploadResult.secure_url;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { productUploadToCloudinary };
