import express from "express";
import { updateUserProfile } from "../controllers/controller_patch";
import { updateGroupMember } from "../controllers/controller_patch";

import VerifyToken from "../token_verification/verify_token";

const patchRouter = express.Router();

patchRouter.patch("/api/updateUserProfile", VerifyToken, updateUserProfile);
patchRouter.patch("/api/updateGroupMember", VerifyToken, updateGroupMember);

export default patchRouter;
