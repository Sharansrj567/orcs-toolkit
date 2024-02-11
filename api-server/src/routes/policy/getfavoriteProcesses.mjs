import express from "express";
import { FavoriteProcess } from "../../models/FavoriteProcess.mjs";

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const processes = await FavoriteProcess.findOne({});
        res.status(200).send(processes.processList || []);
    } catch (err) {
        res.status(500).send({
            message: "Couldn\t fetch favorite processes list",
            error: err,
        });
    }
});

export { router as getFavoriteProcessesRouter };