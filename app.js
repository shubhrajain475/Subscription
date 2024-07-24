import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

import userRoute from "./routes/userRoutes.js";

export const app = express();

app.use(express.json());
app.use("/api/v1", userRoute);
config();
