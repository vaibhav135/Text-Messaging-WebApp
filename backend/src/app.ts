/**
 * author: V.S.B (Vaibhav Singh Bisht)
 *
 * note: If you are reading this peice of code then I want
 * to tell you that at the time of writing this code. I am
 * still a noob programmer and learning so please don't be critical
 * about the code practises and contribute to the project if you want.
 * Thank you
 * Happy Coding
 *
 */

// ignore this comment please: 3rdproject#

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// middleware routes
import routes from "./routes/posts";
import getRouter from "./routes/get";
import patchRouter from "./routes/patch";
import deleteRoute from "./routes/delete";

dotenv.config();
const app = express();
const httpServer = createServer(app);

//setting up socket.io server
//cors origin is set to "*" temporarily
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const corsConfig = {
  credentials: true,
  origin: true,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use("/post", routes);
app.use("/get", getRouter);
app.use("/patch", patchRouter);
app.use("/delete", deleteRoute);

const user = process.env.MONGODB_USER ?? "";
const password = process.env.MONGODB_PASSWORD ?? "";
const database = process.env.MONGODB_DB_NAME ?? "";

const db_url = `mongodb+srv://${user}:${encodeURIComponent(
  password
)}@text-chat-cluster.3rs7h.mongodb.net/${database}?retryWrites=true&w=majority`;

// test_statement: print type
//console.log(db_url);
//console.log(typeof db_url);

type messageDataType = {
  message: string;
  group_name: string;
  group_id: string;
  metadata: {
    time: string;
    sender: string;
    sender_id: string;
  };
};

io.use((socket, next) => {
  const JWT_TOKEN = process.env.JWT_TOKEN ?? "";
  // Remove Bearer from string
  const token = socket.handshake.auth.token;
  //console.log(token);
  //let errorData: errInterface = {};

  if (token) {
    jwt.verify(token, JWT_TOKEN, (err: any, decoded: any) => {
      if (err) {
        const message = "not authorized";
        const data = { content: "Please retry later" }; // additional details
        next({ name: "error", message: message, data: data });
      }
      //req.decoded = decoded;
      return next();
    });
  } else {
    const message = "token not found";
    const data = { content: "Please retry later" }; // additional details
    next({ name: "error", message: message, data: data });
  }
});

io.on("connection", (socket) => {
  console.log("socket io is open");

  socket.on("join_group", (data) => {
    socket.join(data.group_id);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  //socket.on will listen to the messages coming from the client
  socket.on("send_message", (data: messageDataType) => {
    console.log(data);
    socket.to(data.group_id).emit("received_message", data);
  });
});

/**
 * Connecting to the mongoDB atlas database
 * using mongoose
 */
mongoose
  .connect(db_url)
  .then(() => console.log("connected to db"))
  .catch((error) => console.log(error));

// assigning port
const port = process.env.PORT ?? 5000;

/**
 * app.listen(port) will not work here,
 * as it creates a new http Sever
 */

httpServer.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
