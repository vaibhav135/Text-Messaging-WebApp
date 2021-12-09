import express from "express";
import {
  addUser,
  loginUser,
  createGroup,
  getMembersData,
} from "../controllers/controller_posts";
import VerifyToken from "../token_verification/verify_token";

const router = express.Router();

router.post("/api/addUser", addUser);
router.post("/api/loginUser", loginUser);
router.post("/api/creategroup", VerifyToken, createGroup);
router.post("/api/getMembersData", VerifyToken, getMembersData);

export default router;

//import {
//getUsers,
//getSpecificUser,
//createUser,
//deleteUser,
//updateUser,
//} from "../controllers/controller_posts";

//router.get("/", getUsers);
//router.get("/api/:id", getSpecificUser);
//router.post("/api/addUsers", createUser);
//router.delete("/api/delete/:id", deleteUser);
//router.patch("/api/update/:id", updateUser);
