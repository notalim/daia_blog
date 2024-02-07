// routes/index.js
import express from "express";

import usersRouter from "./users.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("This is a server dude! 🙏");
});

const setupRoutes = (app) => {
    app.use("/", router);
    app.use("/users", usersRouter);

};

export default setupRoutes;
