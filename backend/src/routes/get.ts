import express from "express";
import {
  getAllGroups,
  getUserGroups,
  getOneUserGroup,
  getUserProfile,
} from "../controllers/controller_get";
import VerifyToken from "../token_verification/verify_token";

const getRouter = express.Router();

getRouter.get("/api/getAllGroups", VerifyToken, getAllGroups);
getRouter.get("/api/getUserGroups/:id", VerifyToken, getUserGroups);

//the id on the getOneUserGroup will be the groupId
getRouter.get("/api/getOneUserGroup/:id", VerifyToken, getOneUserGroup);
getRouter.get("/api/getUserProfile/:id", VerifyToken, getUserProfile);

export default getRouter;
