import express from "express";

import { getAllUsersRouter } from "./getAllUsers.mjs";
import { getUserByIdRouter } from "./getUserById.mjs";
import { updateUserByIdRouter } from "./updateUserDetails.mjs";
import { deleteUserByIdRouter } from "./deleteUser.mjs";

const router = express.Router();

router.use("/getAllUsers", getAllUsersRouter);
router.use("/getUser", getUserByIdRouter);
router.use("/updateUser", updateUserByIdRouter);
router.use("/deleteUser", deleteUserByIdRouter);

export { router as UsersRouter };
