import multer from "multer";
// import fs from "fs";
import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);

// // Get the directory name
// const __dirname = path.dirname(__filename);

// Ensure the directory exists
// const uploadDir = path.join(__dirname, "../uploads");
// console.log(uploadDir, "File Path .../");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueSuffix);
//   },
// });

// Optional: You can add file filters and size limits here
export const uploadFile = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB file size limit
  },
  // fileFilter: (req, file, cb) => {
  //   const filetypes = /jpeg|jpg|png/;
  //   const mimetype = filetypes.test(file.mimetype);
  //   const extname = filetypes.test(
  //     path.extname(file.originalname).toLowerCase()
  //   );

  //   if (mimetype && extname) {
  //     return cb(null, true);
  //   } else {
  //     cb(new Error("Only .jpeg, .jpg, and .png files are allowed!"));
  //   }
  // },
});

// export const uploadFile = multer({ storage });
