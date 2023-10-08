// routes/index.js
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Welcome to the DAIA blog board!");
});

const setupRoutes = (app) => {
    app.use("/", router);

    // More routes can be added here
};

export default setupRoutes;
