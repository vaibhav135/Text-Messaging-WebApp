import express from "express";
import VerifyToken from "../token_verification/verify_token";

import {
  deleteMember,
  deleteModerator,
  deleteGroup,
} from "../controllers/controller_delete";

const deleteRoute = express.Router();

//for group
deleteRoute.delete("/api/removeGroup", VerifyToken, deleteGroup);
deleteRoute.delete("/api/removeMember", VerifyToken, deleteMember);
deleteRoute.delete("/api/removeModerator", VerifyToken, deleteModerator);

export default deleteRoute;
