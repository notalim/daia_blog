import express from "express";
const app = express();
import dotenv from "dotenv";
import cors from "cors";
import { startSessionIdRefreshTask } from "./utils/scheduler.js";
dotenv.config();

import configRoutes from "./routes/index.js";

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!" + err.message);
});

startSessionIdRefreshTask();

configRoutes(app);
app.listen(3000, async () => {
    console.log("We now have a server! 🙏 ");
    console.log("Your routes will be running on http://localhost:3000");
});
