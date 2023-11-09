// routes/index.js
import express from "express";

import postsRouter from "./posts.js";
import usersRouter from "./users.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("Welcome to the DAIA blog board!");
});

const setupRoutes = (app) => {
    app.use("/", router);
    app.use("/posts", postsRouter);
    app.use("/users", usersRouter);

};

export default setupRoutes;
