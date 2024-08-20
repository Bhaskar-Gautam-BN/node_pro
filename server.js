import express from "express";
import { connectToDb } from "./src/db/db.js";
import {
  homeRouter,
  loginRouter,
  userRouter,
} from "./src/routes/user.route.js";
// import { jwtVerifyToken } from "./src/middlewares/authJwt.js";
import cookieParser from "cookie-parser";
import {
  deleteOneProduct,
  getAllproductRouter,
  productAddRouter,
} from "./src/routes/product.route.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
connectToDb();
app.use("/api/v1/users", userRouter);
app.use("/api/v1", homeRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", productAddRouter);
app.use("/api/v1", getAllproductRouter);
app.use("/api/v1", deleteOneProduct);

app.get("/", (req, res) => {
  res.send("<h1>hello welcome </h1>");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
