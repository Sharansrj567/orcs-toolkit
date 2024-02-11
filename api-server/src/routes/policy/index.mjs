import express from "express";

import { getAllPoliciesRouter } from "./allPolicies.mjs";
import { getSinglePolicyRouter } from "./singlePolicy.mjs";
import { setPolicyRouter } from "./setPolicy.mjs";
import { updatePolicyRouter } from "./updatePolicy.mjs";
import { deletePolicyRouter } from "./deletePolicy.mjs";
import { roleBasedPolicyRouter } from "./getPolicyByRole.mjs";
import { roleWisePolicyRouter } from "./getRoleWisePolicyCount.mjs";
import { updateSinglePolicyRouter } from "./updateSinglePolicy.mjs";
import { addSingleProcessRouter } from "./addSingleProcess.mjs";
import { getFavoriteProcessesRouter } from "./getfavoriteProcesses.mjs";

import { requestLogin } from "../../middlewares/requestLogin.mjs";

const router = express.Router();

router.use("/getPolicies", getAllPoliciesRouter);
router.use("/getPolicy", getSinglePolicyRouter);
router.use("/updatePolicy", requestLogin, updatePolicyRouter);
router.use("/setPolicy", requestLogin, setPolicyRouter);
router.use("/deletePolicy", requestLogin, deletePolicyRouter);
router.use("/getRolePolicy", roleBasedPolicyRouter);
router.use("/getRoleWisePolicy", requestLogin, roleWisePolicyRouter);
router.use("/updateSinglePolicy", requestLogin, updateSinglePolicyRouter);
router.use("/addSingleProcess", requestLogin, addSingleProcessRouter);
router.use("/getFavoriteProcesses", requestLogin, getFavoriteProcessesRouter);

export { router as policyRouter };