import express from "express";
import configRoutes from "./routes/index.js";

import dotenv from "dotenv";
import cors from "cors";

import { startBloodSugarUpdateTask } from "./utils/scheduler.js";
import { handleCrash, handleRejection } from "./services/crashHandler.js";

// ! This will add the environment variables to the process.env object
dotenv.config();

// * This will add the json data to the body of the request
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// * This is the global error handler. Look at the services/crashHandler.js file for more info
process.on("uncaughtException", handleCrash);
process.on("unhandledRejection", handleRejection);

// * This sets up all the routes for the server
configRoutes(app);
app.listen(3000, async () => {
    console.log("We now have a server! 🙏 ");
    console.log("Your routes will be running on http://localhost:3000");

    // * This will start the task to update the blood sugar levels for all users
    startBloodSugarUpdateTask();
});
