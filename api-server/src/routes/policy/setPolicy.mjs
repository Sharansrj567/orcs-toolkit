import express from "express";
import { Policy } from "../../models/Policy.mjs";

const router = express.Router();

router.post("/", async(req, res) => {
    const { role, banList } = req.body;

    const policy = new Policy({
        role,
        banList,
    });

    try {
        const savedPolicy = await policy.save();
        res.status(201).send({
            role: savedPolicy.role,
            banList: savedPolicy.banList,
            createdAt: savedPolicy.createdAt,
        });
    } catch (err) {
        res.status(400).send({
            message: "Failed to save Policy",
            error: err,
        });
    }
});

export { router as setPolicyRouter };