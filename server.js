import express from "express";
import { connectToDb } from "./src/db/db.js";
import {
  homeRouter,
  loginRouter,
  userRouter,
} from "./src/routes/user.route.js";
// import { jwtVerifyToken } from "./src/middlewares/authJwt.js";
import cookieParser from "cookie-parser";
import { productAddRouter } from "./src/routes/product.route.js";
const port = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());
connectToDb();
app.use("/api/v1/users", userRouter);
app.use("/api/v1", homeRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", productAddRouter);

app.get("/", (req, res) => {
  res.send("<h1>hello welcome to the new learning thing</h1>");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
