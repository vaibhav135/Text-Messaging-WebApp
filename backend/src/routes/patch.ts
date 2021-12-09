import express from "express";
import { updateUserProfile } from "../controllers/controller_patch";
import { updateGroupMember } from "../controllers/controller_patch";

import VerifyToken from "../token_verification/verify_token";

const patchRouter = express();

patchRouter.patch("/api/updateUserProfile/:id", VerifyToken, updateUserProfile);
patchRouter.patch("/api/updateGroupMember", VerifyToken, updateGroupMember);

export default patchRouter;
