import express from "express";
import {
  getUsers,
  getSpecificUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/controller_posts";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getSpecificUser);
router.post("/addUsers", createUser);
router.delete("/delete/:id", deleteUser);
router.patch("/update/:id", updateUser);

export default router;
