import express from "express";
import { connectToDb } from "./src/db/db.js";
import {
  homeRouter,
  loginRouter,
  userRouter,
} from "./src/routes/user.route.js";
import http from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import cors from "cors";
// import { jwtVerifyToken } from "./src/middlewares/authJwt.js";
import cookieParser from "cookie-parser";
import {
  deleteOneProduct,
  getAllproductRouter,
  productAddRouter,
} from "./src/routes/product.route.js";
import Chat from "./src/models/chat.model.js";
const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "/index.html"));
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a private room for one-on-one chat
  socket.on("join room", ({ senderId, recipientId }) => {
    const room = [senderId, recipientId].sort().join("-");
    socket.join(room);
    console.log(`User ${senderId} joined room: ${room}`);
  });

  // Send a message to the specific room
  // socket.on("private message", ({ senderId, recipientId, message }) => {
  //   const room = [senderId, recipientId].sort().join("-");
  //   const chatMessage = new Chat({
  //     message,
  //     sender: senderId,
  //     recipient: recipientId,
  //   });

  //   chatMessage.save().then(() => {
  //     io.to(room).emit("chat message", chatMessage);
     
  //   });
  //    socket.on("chat message", (msg) => {
  //   console.log(msg);
  //   io.emit("chat message", msg);
  // });
  // });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("chat message", (msg) => {
    console.log(msg);
    io.emit("chat message", msg);
  });
});


// io.use("connection", (socket) => {
//   console.log("socket connected");
//   socket.on("sendMessage", (message) => {
//     io.emit("receiveMessage", message)
//   });
//   socket.on("disconnect", () => {
//     console.log("socket disconnected");
//   })
// });

app.use(cors());

app.use(cookieParser());
app.use(express.json());
connectToDb();
app.use("/api/v1/users", userRouter);
app.use("/api/v1", homeRouter);
app.use("/api/v1", loginRouter);
app.use("/api/v1", productAddRouter);
app.use("/api/v1", getAllproductRouter);
app.use("/api/v1", deleteOneProduct);

// app.get("/", (req, res) => {
//   res.send("<h1>hello welcome </h1>");
// });

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
