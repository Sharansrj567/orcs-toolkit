import express from "express";
import { Policy } from "../../models/Policy.mjs";

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const data = await Policy.updateOne({ role: req.body.role }, { $addToSet: { banList: req.body.processName } });
        res.status(200).send(data);
    } catch (err) {
        res.status(500).send({
            message: "Couldn't update data",
            error: err,
        });
    }
});

export { router as updateSinglePolicyRouter };