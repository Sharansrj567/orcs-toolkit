import express from "express";
import { FavoriteProcess } from "../../models/FavoriteProcess.mjs";
import { Policy } from "../../models/Policy.mjs";

const router = express.Router();

router.post("/", async(req, res) => {
    const policy = await Policy.updateMany(
        req.body.role[0] === "All" ?
        {} :
        {
            role: { $in: req.body.role },
        }, {
            $addToSet: { banList: req.body.processName },
        }, { $new: true }
    );
    if (req.body.addToFavorite) {
        const favorites = await FavoriteProcess.updateMany({}, {
            $addToSet: { processList: req.body.processName },
        });
    }
    if (!policy)
        res.status(401).send({
            message: "Policy not found!",
        });

    res.status(201).send({
        message: "Successfully updated policy",
        policy,
    });
});

export { router as addSingleProcessRouter };