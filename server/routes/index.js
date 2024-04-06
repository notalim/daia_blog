import express from "express";

import usersRouter from "./users.js";
import contactsRouter from "./contacts.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).send("This is a server dude! 🙏");
});

const setupRoutes = (app) => {
    app.use("/", router);
    app.use("/users", usersRouter);
    app.use("/users", contactsRouter);

    app.use("*", (req, res) => {
        res.status(404).json({ error: "Not found" });
    });
};

export default setupRoutes;
